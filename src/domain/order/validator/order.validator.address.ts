import { AbstractValidator } from "../../../pattern/validator/validator.js";
import type { Order } from "../order.js";

export class DeliveryAddressValidator extends AbstractValidator {
  constructor(private order: Order) {
    super();
  }

  public validate(): boolean {
    if (!this.order.getDeliveryAddress()) {
      console.log("Delivery address is not provided");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
