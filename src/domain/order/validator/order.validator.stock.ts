import { AbstractValidator } from "../../../pattern/validator/validator.js";
import type { Order } from "../order.js";

export class FactoryStockValidator extends AbstractValidator {
  constructor(private order: Order) {
    super();
  }

  public validate(): boolean {
    const pizzas = this.order.getCart().getPizzas();
    const stock = this.order.getRestaurant().getStock();
    for (const pizza of pizzas) {
      if (!stock.isInStock(pizza)) {
        console.log(`Pizza is out of stock`);
        return false;
      }
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
