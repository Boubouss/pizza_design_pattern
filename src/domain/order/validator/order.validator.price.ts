import { AbstractValidator } from "../../../pattern/validator/validator.js";
import type { Order } from "../order.js";

export class TotalPriceValidator extends AbstractValidator {
  constructor(private order: Order) {
    super();
  }

  public validate(): boolean {
    if (this.order.calculateTotal() < 15.0) {
      console.log("Total price is less than 15.00");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
