import type { Order } from '../order.js'

export interface Event {
  message(): string;
}

export class OrderEvent implements Event {
  constructor(private order: Order) {}

  message(): string {
    return `le status de l'order ${this.order.getId()} est ${this.order.getStatus()}`
  }
}


