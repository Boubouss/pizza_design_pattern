import { AbstractValidator } from "../../../pattern/validator/validator.js";
import type { Order } from "../order.js";

export class CartIsNotEmptyValidator extends AbstractValidator {
  constructor(private order: Order) {
    super();
  }

  public validate(): boolean {
    if (this.order.getCart().getPizzas().length === 0) {
      console.log("Cart is empty");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
