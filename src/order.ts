import type { PricingStrategy } from "./pricing.ts";
import { Cart } from "./cart.js";
import type { Restaurant } from "./Restaurant.js";

export class Order {
  constructor(
    private restaurant: Restaurant,
    private pricingStrategy: PricingStrategy,
    private cart: Cart,
    private deliveryAddress: string | null,
    private orderTime: Date,
  ) {}

  public getOrderTime(): Date {
    return this.orderTime;
  }

  calculateTotal(): number {
    return this.pricingStrategy.calculatePrice(this.cart.calculatePrice());
  }

  public getRestaurant(): Restaurant {
    return this.restaurant;
  }

  public getCart(): Cart {
    return this.cart;
  }

  public getDeliveryAddress(): string | null {
    return this.deliveryAddress;
  }
}
