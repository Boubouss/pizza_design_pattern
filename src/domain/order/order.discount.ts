export interface OrderDiscountStrategy {
  calculatePrice(basePrice: number): number;
}

export class StandardDiscount implements OrderDiscountStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice;
  }
}

export class HappyHourDiscount implements OrderDiscountStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 0.8;
  }
}

export class LoyaltyDiscount implements OrderDiscountStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 0.9;
  }
}

export class PromotionCodeDiscount implements OrderDiscountStrategy {
  constructor(private discount: number) {}
  calculatePrice(basePrice: number): number {
    return basePrice * (1 - this.discount);
  }
}
