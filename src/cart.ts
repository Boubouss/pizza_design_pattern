import type { Pizza } from "./pizza.js";
import { CartSnapshot } from './memento/snapshot.js'
import { CartHistory } from './memento/history.js'

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
}

export class CartWithHistory extends Cart {
  private history: CartHistory

  constructor(state: Pizza[]) {
    super(state)
    this.history = new CartHistory()
  }
  
  backup(): void {
    const snap = new CartSnapshot([...this.pizzas])
    this.history.save(snap)
  }

  undo(): void {
    this.pizzas = this.history.restore().getState()
  }

  static fromCart(cart: Cart): CartWithHistory {
    return new CartWithHistory(cart.getPizzas())
  }
}
