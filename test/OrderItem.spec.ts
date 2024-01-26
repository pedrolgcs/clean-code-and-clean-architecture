import { describe, it, expect } from 'vitest'
import { OrderItem } from '@/OrderItem'

describe('OrderItem', () => {
  it('should be able to create an order item', () => {
    const orderItem = new OrderItem(1, 1000, 10)
    expect(orderItem.getTotal()).toBe(10000)
  })
})
