import { AbstractValidator } from "./validator.js";
import { TotalPriceValidator } from "./TotalPriceValidator.js";
import { FactoryIsOpenValidator } from "./FactoryIsOpenValidator.js";
import { DeliveryAddressValidator } from "./DeliveryAddressValidator.js";
import { CartIsNotEmptyValidator } from "./CartIsNotEmptyValidator.js";
import { FactoryStockValidator } from "./FactoryStockValidator.js";
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
