import { FreightCalculator } from './FreightCalculator'
import { Item } from './Item'

export class DefaultFreightCalculator implements FreightCalculator {
  calculate(item: Item) {
    const freight = 1000 * item.getVolume() * (item.getDensity() / 100)
    return Math.max(10, freight)
  }
}
