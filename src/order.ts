import type { PricingStrategy } from './pricing.ts';

export class Order {
  constructor(private pricingStrategy: PricingStrategy) {}

  calculateTotal(basePrice: number): number {
    return this.pricingStrategy.calculatePrice(basePrice);
  }
}
