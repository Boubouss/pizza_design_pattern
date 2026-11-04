import type { Pizza } from "./pizza.js";

export class Cart {
  private pizzas: Pizza[];
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
}
