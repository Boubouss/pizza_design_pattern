import { AbstractValidator } from "./validator.js";
import { TotalPriceValidator } from "./totalPriceValidator.js";
import { FactoryIsOpenValidator } from "./factoryIsOpenValidator.js";
import { DeliveryAddressValidator } from "./deliveryAddressValidator.js";
import { CartIsNotEmptyValidator } from "./cartIsNotEmptyValidator.js";
import { FactoryStockValidator } from "./factoryStockValidator.js";
import type { Order } from "../order.js";

export class OrderValidatorFactory {
  static createValidatorChain(order: Order): AbstractValidator {
    const totalPriceValidator = new TotalPriceValidator(order);
    const factoryIsOpenValidator = new FactoryIsOpenValidator(order);
    const deliveryAddressValidator = new DeliveryAddressValidator(order);
    const cartIsNotEmptyValidator = new CartIsNotEmptyValidator(order);
    const factoryStockValidator = new FactoryStockValidator(order);

    cartIsNotEmptyValidator.setNext(totalPriceValidator);
    totalPriceValidator.setNext(deliveryAddressValidator);
    deliveryAddressValidator.setNext(factoryIsOpenValidator);
    factoryIsOpenValidator.setNext(factoryStockValidator);
    return cartIsNotEmptyValidator;
  }
}
