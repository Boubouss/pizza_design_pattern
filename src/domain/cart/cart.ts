import type { Pizza } from "../pizza/pizza.js";

export class Cart {
  protected pizzas: Pizza[];

  constructor(pizzas: Pizza[]) {
    this.pizzas = pizzas;
  }

  public calculatePrice(): number {
    let totalPrice: number = 0;
    this.pizzas.forEach((p) => {
      totalPrice += p.calculatePrice();
    });
    return totalPrice;
  }

  public getPizzas(): Pizza[] {
    return this.pizzas;
  }

  public addPizza(pizza: Pizza): void {
    this.pizzas.push(pizza);
  }
}
