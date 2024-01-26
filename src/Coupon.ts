export class Coupon {
  constructor(
    readonly code: string,
    readonly percentage: number,
    readonly expirationDate?: Date,
  ) {}

  isValid(toDay: Date = new Date()): boolean {
    if (!this.expirationDate) return true
    return this.expirationDate.getTime() >= toDay.getTime()
  }

  isExpired(toDay: Date = new Date()): boolean {
    return !this.isValid(toDay)
  }

  calculateDiscount(amount: number, today: Date = new Date()): number {
    if (this.isExpired(today)) return 0
    return (amount * this.percentage) / 100
  }
}
