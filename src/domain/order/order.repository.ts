import type { Client } from "../client/client.js";
import type { Order, StatusOrder } from "./order.js";

export interface OrderRepository {
  getClientOrders(client: Client): Order[];
  getSortedOrders(client: Client): Order[];
  getFilteredOrders(client: Client, status: StatusOrder): Order[];
  saveOrder(order: Order): void;
}

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  constructor(initOrders: Order[]) {
    this.orders = initOrders;
  }

  getClientOrders(client: Client): Order[] {
    return this.orders.filter((order) => order.getClient().getId() === client.getId());
  }

  getSortedOrders(client: Client): Order[] {
    return this.orders
      .filter((order) => order.getClient().getId() === client.getId())
      .sort((a, b) => a.getOrderTime().getTime() - b.getOrderTime().getTime());
  }

  getFilteredOrders(client: Client, status: StatusOrder): Order[] {
    return this.orders.filter(
      (order) => order.getClient().getId() === client.getId() && order.getStatus() === status,
    );
  }

  saveOrder(order: Order): void {
    this.orders.push(order);
  }
}
