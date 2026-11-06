import { AbstractValidator } from "../../../pattern/validator/validator.js";
import { TotalPriceValidator } from "./order.validator.price.js";
import { FactoryIsOpenValidator } from "./order.validator.open.js";
import { DeliveryAddressValidator } from "./order.validator.address.js";
import { CartIsNotEmptyValidator } from "./order.validator.cart.js";
import { FactoryStockValidator } from "./order.validator.stock.js";
import type { Order } from "../order.js";

export class OrderValidatorFactory {
  static createValidatorChain(order: Order): AbstractValidator {
    const totalPriceValidator = new TotalPriceValidator(order);
    const factoryIsOpenValidator = new FactoryIsOpenValidator(order);
    const deliveryAddressValidator = new DeliveryAddressValidator(order);
    const cartIsNotEmptyValidator = new CartIsNotEmptyValidator(order);
    const factoryStockValidator = new FactoryStockValidator(order);

    cartIsNotEmptyValidator
      .setNext(totalPriceValidator)
      .setNext(deliveryAddressValidator)
      .setNext(factoryIsOpenValidator)
      .setNext(factoryStockValidator);
    return cartIsNotEmptyValidator;
  }
}
