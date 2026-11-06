import type { Pizza } from "../pizza/pizza.js";
import { Cart } from "./cart.js";
import { CartSnapshot, CartHistory } from "./cart.memento.js";

export class CartWithHistory extends Cart {
  private history: CartHistory;

  constructor(state: Pizza[]) {
    super(state);
    this.history = new CartHistory();
  }

  public addPizza(pizza: Pizza): void {
    this.backup();
    super.addPizza(pizza);
  }

  backup(): void {
    const snap = new CartSnapshot([...this.pizzas]);
    this.history.save(snap);
  }

  undo(): void {
    this.pizzas = this.history.restore().getState();
  }

  static fromCart(cart: Cart): CartWithHistory {
    return new CartWithHistory(cart.getPizzas());
  }
}
