import { AbstractValidator } from "./validator.js";
import type { Order } from "../order.js";

export class FactoryIsOpenValidator extends AbstractValidator {
  private order: Order;
  constructor(order: Order) {
    super();
    this.order = order;
  }

  public validate(): boolean {
    const orderTime = this.order.getOrderTime().getHours();
    const { open, close } = this.order.getRestaurant().getOpeningHours();
    const openHour = open.getHours();
    const closeHour = close.getHours();

    if (orderTime < openHour || orderTime >= closeHour) {
      console.log("Factory is closed");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}
