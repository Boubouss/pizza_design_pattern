import type { Client } from "../client.js";
import type { Order, StatusOrder } from "../order.js";
import type { Repository } from "./repository.js";

class OrderRepository implements Repository {
  private orders: Order[] = [];

  constructor(initOrders: Order[]) {
    this.orders = initOrders;
  }

  getClientOrders(client: Client): Order[] {
    return this.orders.filter((order) => order.getClient() === client);
  }

  getSortedOrders(client: Client): Order[] {
    return this.orders
      .filter((order) => order.getClient() === client)
      .sort((a, b) => a.getOrderTime().getTime() - b.getOrderTime().getTime());
  }
  
  getFiltredOrders(client: Client, status: StatusOrder): Order[] {
    const flitredOrders = this.orders.filter(
      (order) => order.getClient() === client && order.getStatus() === status,
    );
    return flitredOrders;
  }

  saveOrder(order: Order): void {
    this.orders.push(order);
  }
}
