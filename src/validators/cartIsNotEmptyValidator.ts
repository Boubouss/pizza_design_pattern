import {AbstractValidator} from "./validator.js";
import type { Order } from "../order.js";


export class CartIsNotEmptyValidator extends AbstractValidator {
  private order: Order;
  constructor(order: Order) {
    super();
    this.order = order;
  }

  public validate(): boolean {
    if (this.order.getCart().calculatePrice() <= 0) {
      console.log("Cart is empty");
      return false;
    }
    if (this.next) {
      return this.next.validate();
    }
    return true;
  }
}