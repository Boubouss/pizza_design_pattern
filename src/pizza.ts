import { Ingredient, Size, Base } from "./ingredients.js";
export abstract class Pizza {
  protected size: Size;
  protected ingredients: Set<Ingredient>;
  protected base: Base = Base.TOMATO;
  protected basePrice: number = 5.0;
  protected multiplier: number;

  constructor() {
    this.size = Size.MEDIUM;
    this.ingredients = new Set();
    this.multiplier = 1.0;
    this.setSize(this.size);
  }

  public setBase(base: Base): void {
    this.base = base;
  }

  abstract setSize(size: Size): void;

  public getIngredients(): Ingredient[] {
    return [...this.ingredients];
  }

  public addIngredient(ingredient: Ingredient): void {
    this.ingredients.add(ingredient);
  }

  public removeIngredient(ingredient: Ingredient): void {
    this.ingredients.delete(ingredient);
  }

  calculatePrice(): number {
    return (
      (this.basePrice +
        [...this.ingredients].reduce(
          (sum, ingredient) => sum + ingredient,
          0,
        )) *
      this.multiplier
    );
  }
}
export class DaMichelePizza extends Pizza {
  setSize(size: Size): void {
    this.size = size;
    switch (size) {
      case Size.SMALL:
        this.multiplier = 0.8;
        break;
      case Size.MEDIUM:
        this.multiplier = 1.0;
        break;
      case Size.LARGE:
        this.multiplier = 1.2;
        break;
      case Size.XTRA_LARGE:
        this.multiplier = 1.5;
        break;
    }
  }
}
export class RossopomodoroPizza extends Pizza {
  setSize(size: Size): void {
    this.size = size;
    switch (size) {
      case Size.SMALL:
        this.multiplier = 0.7;
        break;
      case Size.MEDIUM:
        this.multiplier = 0.9;
        break;
      case Size.LARGE:
        this.multiplier = 1.1;
        break;
      case Size.XTRA_LARGE:
        this.multiplier = 1.4;
        break;
    }
  }
}
export class PizziumPizza extends Pizza {
  setSize(size: Size): void {
    this.size = size;
    switch (size) {
      case Size.SMALL:
        this.multiplier = 1.0;
        break;
      case Size.MEDIUM:
        this.multiplier = 1.2;
        break;
      case Size.LARGE:
        this.multiplier = 1.4;
        break;
      case Size.XTRA_LARGE:
        this.multiplier = 1.7;
        break;
    }
  }
}
