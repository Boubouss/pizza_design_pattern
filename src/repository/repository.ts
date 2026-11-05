import type { Client } from "../client.js";
import type { Order, StatusOrder } from "../order.js";

export interface Repository {
    getClientOrders(client: Client): Order[];
    getSortedOrders(client: Client): Order[];
    getFiltredOrders(client: Client, status: StatusOrder): Order[];

    saveOrder(order: Order): void;

}