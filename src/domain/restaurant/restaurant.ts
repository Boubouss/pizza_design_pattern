import type { PizzaFactory } from "../pizza/pizza.factory.js";
import { Stock } from "./restaurant.stock.js";

export class Restaurant {
  private factory: PizzaFactory;
  private stock: Stock;
  private name: string;
  private openingHours: { open: number; close: number };

  constructor(
    factory: PizzaFactory,
    stock: Stock,
    name: string,
    openingHours: { open: number; close: number },
  ) {
    this.factory = factory;
    this.stock = stock;
    this.name = name;
    this.openingHours = openingHours;
  }

  getOpeningHours(): { open: number; close: number } {
    return this.openingHours;
  }

  getName(): string {
    return this.name;
  }

  getFactory(): PizzaFactory {
    return this.factory;
  }

  getStock(): Stock {
    return this.stock;
  }
}
