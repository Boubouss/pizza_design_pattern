import { AbstractValidator } from "./validator.js";
import type { Order } from "../order.js";

export class DeliveryAddressValidator extends AbstractValidator {
  private order: Order;
  constructor(order: Order) {
    super();
    this.order = order;
  }

  public validate(): boolean {
    const deliveryAddress = this.order.getDeliveryAddress();
    if (!deliveryAddress) {
      console.log("Delivery address is not provided");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
