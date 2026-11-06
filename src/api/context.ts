import { randomUUID } from 'crypto'
import { DaMicheleFactory, RossopomodoroFactory, PizziumFactory } from '../domain/pizza/pizza.factory.js'
import { Restaurant } from '../domain/restaurant/restaurant.js'
import { Stock } from '../domain/restaurant/restaurant.stock.js'
import { InMemoryOrderRepository } from '../domain/order/order.repository.js'
import { CartWithHistory } from '../domain/cart/cart.history.js'
import { Client } from '../domain/client/client.js'
import { Ingredient } from '../domain/menu/menu.js'
import type { Order } from '../domain/order/order.js'

const allIngredients = new Set<Ingredient>(Object.values(Ingredient) as Ingredient[])

export const restaurants = new Map<string, Restaurant>([
  ['damichele', new Restaurant(new DaMicheleFactory(), new Stock(new Set(allIngredients)), 'DaMichele', { open: 0, close: 24 })],
  ['rossopomodoro', new Restaurant(new RossopomodoroFactory(), new Stock(new Set(allIngredients)), 'Rossopomodoro', { open: 0, close: 24 })],
  ['pizzium', new Restaurant(new PizziumFactory(), new Stock(new Set(allIngredients)), 'Pizzium', { open: 0, close: 24 })],
])

export const clients = new Map<string, Client>([
  ['client-1', new Client('client-1', 'Alice')],
  ['client-2', new Client('client-2', 'Bob')],
])

export const carts = new Map<string, CartWithHistory>()
export const ordersById = new Map<string, Order>()
export const orderRepository = new InMemoryOrderRepository([])

export function createCart(): string {
  const id = randomUUID()
  carts.set(id, new CartWithHistory([]))
  return id
}
