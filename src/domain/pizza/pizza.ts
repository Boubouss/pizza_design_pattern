import { Size, Base, IngredientPrices } from '../menu/menu.js';
import type { Ingredient, MenuItem } from '../menu/menu.js';
import type { PriceStrategy } from './pizza.price.js';

export interface Pizza {
  calculatePrice(): number
  getSize(): Size
  getIngredients(): Ingredient[]
}

export class PreMadePizza implements Pizza {
  constructor(private type: MenuItem, private price: number, private size: Size, private sizeCost: number, private priceStrategy: PriceStrategy, private ingredients: Ingredient[]) {}

  public getSize(): Size {
    return this.size
  }

  public getIngredients(): Ingredient[] {
    return this.ingredients
  }

  public calculatePrice(): number {
    return this.priceStrategy.calculatePrice(this.price, this.sizeCost, 0)
  }
}

export class CustomPizza implements Pizza {
  private size: Size;
  private ingredients: Set<Ingredient> = new Set<Ingredient>();
  private base: Base = Base.TOMATO;
  private basePrice: number = 5.0;
  private sizeCost: number
  private priceStrategy: PriceStrategy;

  constructor(size: Size, sizeCost: number, priceStrategy: PriceStrategy) {
    this.size = size
    this.sizeCost = sizeCost
    this.priceStrategy = priceStrategy
  }

  public setBase(base: Base): void {
    this.base = base;
  }

  public getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.add(ingredient);
  }

  public removeIngredient(ingredient: Ingredient): void {
    this.ingredients.delete(ingredient);
  }

  public getSize(): Size {
    return this.size
  }

  public getSizeCost(): number {
    return this.sizeCost
  }

  public getPriceStrategy(): PriceStrategy {
    return this.priceStrategy
  }

  public calculatePrice(): number {
    return this.priceStrategy.calculatePrice(this.basePrice, this.sizeCost, [...this.ingredients].reduce((acc, ingredient) => acc + (IngredientPrices.get(ingredient) ?? 0), 0))
  }
}
