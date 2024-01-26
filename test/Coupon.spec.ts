import { describe, it, expect } from 'vitest'
import { Coupon } from '@/Coupon'

describe('Coupon', () => {
  it('should be able to create a coupon', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2020-10-10'))
    const today = new Date('2020-01-01')
    const isValid = coupon.isValid(today)
    expect(isValid).toBeTruthy()
  })

  it('should be able to create a expired coupon', () => {
    const coupon = new Coupon('VALE20', 20, new Date('2020-02-02'))
    const today = new Date('2020-02-10')
    const isValid = coupon.isValid(today)
    expect(isValid).toBeFalsy()
  })

  it('should be able to calculate a discount', () => {
    const coupon = new Coupon('VALE20', 20)
    const discount = coupon.calculateDiscount(100)
    expect(discount).toBe(20)
  })
})
