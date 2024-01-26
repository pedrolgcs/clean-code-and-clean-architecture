import { Coupon } from './Coupon'
import { Cpf } from './Cpf'
import { DefaultFreightCalculator } from './DefaultFreightCalculator'
import { FreightCalculator } from './FreightCalculator'
import { Item } from './Item'
import { OrderItem } from './OrderItem'

export class Order {
  private cpf: Cpf
  private orderItems: OrderItem[]
  private coupon: Coupon | undefined
  private date: Date
  private freight: number
  private freightCalculator: FreightCalculator

  constructor(
    cpf: string,
    date: Date = new Date(),
    freightCalculator: FreightCalculator = new DefaultFreightCalculator(),
  ) {
    this.cpf = new Cpf(cpf)
    this.date = date
    this.orderItems = []
    this.freight = 0
    this.freightCalculator = freightCalculator
  }

  addItem(item: Item, quantity: number) {
    this.freight += this.freightCalculator.calculate(item) * quantity
    this.orderItems.push(new OrderItem(item.id, item.price, quantity))
  }

  addCoupon(coupon: Coupon) {
    if (coupon.isExpired(this.date)) return
    this.coupon = coupon
  }

  getFreight() {
    return this.freight
  }

  getTotal() {
    let total = 0
    for (const orderItems of this.orderItems) {
      total += orderItems.getTotal()
    }
    if (this.coupon) {
      total -= this.coupon.calculateDiscount(total, this.date)
    }
    return total
  }
}
