import type { OrderDiscountStrategy } from "./order.discount.js";
import { Cart } from "../cart/cart.js";
import type { Restaurant } from "../restaurant/restaurant.js";
import { Publisher } from '../../pattern/observer/observer.js'
import { OrderEvent } from './order.event.js'
import type { Client } from "../client/client.js";

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
    private discountStrategy: OrderDiscountStrategy,
    private cart: Cart,
    private deliveryAddress: string | null,
    private orderTime: Date,
    private client: Client
  ) {
    this.publisher = new Publisher()
    this.status = StatusOrder.PENDING
  }

  public getOrderTime(): Date {
    return this.orderTime;
  }

  calculateTotal(): number {
    return this.discountStrategy.calculatePrice(this.cart.calculatePrice());
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

  public getClient(): Client {
    return this.client;
  }
}
