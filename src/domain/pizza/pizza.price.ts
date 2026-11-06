export interface PriceStrategy {
  calculatePrice(basePrice: number, sizeCost: number, ingredientsCost: number): number;
}

export class AdditivePriceStrategy implements PriceStrategy {
  calculatePrice(
    basePrice: number,
    sizeCost: number,
    ingredientsCost: number,
  ): number {
    return basePrice + ingredientsCost + sizeCost;
  }
}

export class MultiplicativePriceStrategy implements PriceStrategy {
  calculatePrice(
    basePrice: number,
    sizeCost: number,
    ingredientsCost: number,
  ): number {
    return (basePrice + ingredientsCost) * sizeCost;
  }
}
