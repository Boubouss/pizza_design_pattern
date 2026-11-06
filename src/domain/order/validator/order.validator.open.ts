import { AbstractValidator } from "../../../pattern/validator/validator.js";
import type { Order } from "../order.js";

export class FactoryIsOpenValidator extends AbstractValidator {
  constructor(private order: Order) {
    super();
  }

  public validate(): boolean {
    const orderTime = this.order.getOrderTime().getHours();
    const { open, close } = this.order.getRestaurant().getOpeningHours();

    if (orderTime < open || orderTime >= close) {
      console.log("Factory is closed");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
