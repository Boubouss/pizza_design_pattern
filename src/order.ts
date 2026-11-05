import type { PricingStrategy } from "./pricing.js";
import { Cart } from "./cart.js";
import type { Restaurant } from "./restaurant.js";
import { Publisher } from './observer/publisher.js'
import { OrderEvent } from './observer/event.js'
import { EmailListener, SmsListener } from './observer/listener.js'

export enum StatusOrder {
  PENDING = "PENDING",
  CLOSE = "CLOSE",
}

export class Order {
  private publisher: Publisher 
  private status: StatusOrder
  constructor(
    private id: string,
    private restaurant: Restaurant,
    private pricingStrategy: PricingStrategy,
    private cart: Cart,
    private deliveryAddress: string | null,
    private orderTime: Date,
  ) {
    this.publisher = new Publisher()
    this.status = StatusOrder.PENDING
  }

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

  public getId(): string {
    return this.id;
  }

  public getPublisher(): Publisher {
    return this.publisher
  }

  public setStatus(status: StatusOrder) {
    this.status = status
    this.publisher.notify(new OrderEvent(this))
  }

  public getStatus(): StatusOrder {
    return this.status
  }

  public getDeliveryAddress(): string | null {
    return this.deliveryAddress;
  }
}
