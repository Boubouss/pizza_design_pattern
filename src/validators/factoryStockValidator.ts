import { AbstractValidator } from "./validator.js";
import type { Order } from "../order.js";

export class FactoryStockValidator extends AbstractValidator {
  private order: Order;
  constructor(order: Order) {
    super();
    this.order = order;
  }

  public validate(): boolean {
    const pizzas = this.order.getCart().getPizzas();
    const stock = this.order.getRestaurant().getStock();
    for (const pizza of pizzas) {
      if (!stock.isInStock(pizza.getType())) {
        console.log(`Pizza ${pizza.getType()} is out of stock`);
        return false;
      }
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
