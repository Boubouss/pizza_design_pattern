import type { Menu } from "./menu.js";

export interface PriceStrategy {
  calculatePrice(type: Menu, sizeCost: number, ingredientsCost: number): number;
}

export class DaMichelePriceStrategy implements PriceStrategy {
  calculatePrice(
    type: Menu,
    sizeCost: number,
    ingredientsCost: number,
  ): number {
    return type + ingredientsCost + sizeCost;
  }
}

export class RossopomodoroPriceStrategy implements PriceStrategy {
  calculatePrice(
    type: Menu,
    sizeCost: number,
    ingredientsCost: number,
  ): number {
    return (type + ingredientsCost) * sizeCost;
  }
}

export class PizziumPriceStrategy implements PriceStrategy {
  calculatePrice(
    type: Menu,
    sizeCost: number,
    ingredientsCost: number,
  ): number {
    return (type + ingredientsCost) * sizeCost;
  }
}
