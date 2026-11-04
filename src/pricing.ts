//Interface commune aux stratégies
export interface PricingStrategy {
  calculatePrice(basePrice: number): number;
}

//Stratégie standard
export class StandardPricing implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice;
  }
}

//Happy hour
export class HappyHourPricing implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 0.8;
  }
}

//Fidélité
export class LoyaltyPricing implements PricingStrategy {
  calculatePrice(basePrice: number): number {
    return basePrice * 0.9;
  }
}

//Promotion code
export class PromotionCodePricing implements PricingStrategy {
    constructor(private discount: number) {}
    calculatePrice(basePrice: number): number {
        return basePrice * (1 - this.discount);
    }
}
