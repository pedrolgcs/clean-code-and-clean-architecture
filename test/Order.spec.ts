import { describe, it, expect } from 'vitest'
import { Coupon } from '@/Coupon'
import { FixedFreightCalculator } from '@/FixedFreightCalculator'
import { Item } from '@/Item'
import { Order } from '@/Order'

describe('Order', () => {
  it('should be able to create a empty order', () => {
    const cpf = '738.189.050-02'
    const order = new Order(cpf)
    const total = order.getTotal()
    expect(total).toBe(0)
  })

  it('should not be able to create a order with invalid CPF', () => {
    const cpf = '111.111.111-11'
    expect(() => new Order(cpf)).toThrow(new Error('Invalid CPF'))
  })

  it('should be able to calculate the total with 3 items', () => {
    const cpf = '738.189.050-02'
    const order = new Order(cpf)
    order.addItem(new Item(1, 'music', 'cd', 30), 3)
    order.addItem(new Item(1, 'video', 'dvd', 50), 1)
    order.addItem(new Item(1, 'video', 'vhs', 10), 2)
    const total = order.getTotal()
    expect(total).toBe(160)
  })

  it('should be able to calculate the total using a discount in percentage', () => {
    const cpf = '738.189.050-02'
    const order = new Order(cpf)
    order.addItem(new Item(1, 'music', 'cd', 30), 3)
    order.addItem(new Item(1, 'video', 'dvd', 50), 1)
    order.addItem(new Item(1, 'video', 'vhs', 10), 2)
    order.addCoupon(new Coupon('VALE20', 20))
    const total = order.getTotal()
    expect(total).toBe(128)
  })

  it('should be able to calculate the total using a expired coupon', () => {
    const cpf = '738.189.050-02'
    const order = new Order(cpf, new Date('2020-02-02'))
    order.addItem(new Item(1, 'music', 'cd', 30), 3)
    order.addItem(new Item(1, 'video', 'dvd', 50), 1)
    order.addItem(new Item(1, 'video', 'vhs', 10), 2)
    order.addCoupon(new Coupon('VALE20', 20, new Date('2020-01-02')))
    const total = order.getTotal()
    expect(total).toBe(160)
  })

  it('should be able to calculate delivery fee using default freight', () => {
    const cpf = '738.189.050-02'
    const order = new Order(cpf, new Date('2020-02-02'))
    order.addItem(
      new Item(4, 'musical instrument', 'guitar', 1000, 100, 30, 10, 3),
      1,
    )
    order.addItem(
      new Item(5, 'musical instrument', 'amplifier', 5000, 100, 50, 50, 20),
      1,
    )
    order.addItem(
      new Item(6, 'musical instrument', 'cable', 30, 10, 10, 10, 0.9),
      3,
    )
    const freight = order.getFreight()
    expect(freight).toBe(260)
  })

  it('should be able to calculate delivery fee using fix freight', () => {
    const cpf = '738.189.050-02'
    const order = new Order(
      cpf,
      new Date('2020-02-02'),
      new FixedFreightCalculator(),
    )
    order.addItem(
      new Item(4, 'musical instrument', 'guitar', 1000, 100, 30, 10, 3),
      1,
    )
    order.addItem(
      new Item(5, 'musical instrument', 'amplifier', 5000, 100, 50, 50, 20),
      1,
    )
    order.addItem(
      new Item(6, 'musical instrument', 'cable', 30, 10, 10, 10, 0.9),
      3,
    )
    const freight = order.getFreight()
    expect(freight).toBe(50)
  })
})
