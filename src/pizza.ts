import { Ingredient, Size, Base } from "./ingredients.js";
import type {
  DaMicheleMenu,
  Menu,
  PizziumMenu,
  RossopomodoroMenu,
} from "./menu.js";
import { DaMichelePriceStrategy, type PriceStrategy } from "./pizza.price.js";
export abstract class Pizza {
  protected type: Menu;
  protected size: Size;
  protected ingredients: Set<Ingredient>;
  protected base: Base = Base.TOMATO;
  protected basePrice: number = 5.0;
  protected sizeCost: number;

  constructor(type: Menu, size: Size) {
    this.ingredients = new Set();
    this.sizeCost = 1.0;
    this.size = size;
    this.setSize(size);
    this.type = type;
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

  abstract calculatePrice(priceStrategy: PriceStrategy): number;
}

export class DaMichelePizza extends Pizza {
  private priceStrategy: PriceStrategy;

  constructor(type: DaMicheleMenu, size: Size) {
    super(type, size);
    this.priceStrategy = new DaMichelePriceStrategy();
  }

  calculatePrice(): number {
    return this.priceStrategy.calculatePrice(
      this.type,
      this.sizeCost,
      [...this.ingredients].reduce((acc, ingredient) => acc + ingredient, 0),
    );
  }

  setSize(size: Size): void {
    this.size = size;
    switch (size) {
      case Size.SMALL:
        this.sizeCost = -2;
        break;
      case Size.LARGE:
        this.sizeCost = 3;
        break;
      case Size.XTRA_LARGE:
        this.sizeCost = 5;
        break;
      default:
        throw new Error(`Invalid size for DaMichelePizza`);
    }
  }
}

export class RossopomodoroPizza extends Pizza {
  private priceStrategy: PriceStrategy;

  constructor(type: RossopomodoroMenu, size: Size) {
    super(type, size);
    this.priceStrategy = new DaMichelePriceStrategy();
  }

  calculatePrice(): number {
    return this.priceStrategy.calculatePrice(
      this.type,
      this.sizeCost,
      [...this.ingredients].reduce((acc, ingredient) => acc + ingredient, 0),
    );
  }
  setSize(size: Size): void {
    this.size = size;
    switch (size) {
      case Size.SMALL:
        this.sizeCost = 0.8;
        break;
      case Size.LARGE:
        this.sizeCost = 1.3;
        break;
      case Size.XTRA_LARGE:
        this.sizeCost = 1.5;
        break;
      default:
        throw new Error(`Invalid size for RossopomodoroPizza`);
    }
  }
}

export class PizziumPizza extends Pizza {
  private priceStrategy: PriceStrategy;

  constructor(type: PizziumMenu, size: Size) {
    super(type, size);
    this.priceStrategy = new DaMichelePriceStrategy();
  }

  calculatePrice(): number {
    return this.priceStrategy.calculatePrice(
      this.type,
      this.sizeCost,
      [...this.ingredients].reduce((acc, ingredient) => acc + ingredient, 0),
    );
  }
  setSize(size: Size): void {
    this.size = size;
    switch (size) {
      case Size.MEDIUM:
        this.sizeCost = 1.2;
        break;
      default:
        throw new Error(`Invalid size for PizziumPizza`);
    }
  }
}
