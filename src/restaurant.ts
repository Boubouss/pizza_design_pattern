import type { PizzaFactory } from "./factory.js";
import { Stock } from "./stock.js";

export class Restaurant {
  private factory: PizzaFactory;
  private stock: Stock;
  private name: string;
  private openingHours: { open: Date; close: Date };

  constructor(
    factory: PizzaFactory,
    stock: Stock,
    name: string,
    openingHours: { open: Date; close: Date },
  ) {
    this.factory = factory;
    this.stock = stock;
    this.name = name;
    this.openingHours = openingHours;
  }

  getOpeningHours(): { open: Date; close: Date } {
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
