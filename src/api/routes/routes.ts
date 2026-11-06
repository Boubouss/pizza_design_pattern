import type { FastifyInstance } from 'fastify'
import { menuRoutes } from './routes.menu.js'
import { cartRoutes } from './routes.cart.js'
import { orderRoutes } from './routes.order.js'
import { clientRoutes } from './routes.client.js'

export async function apiRoutes(app: FastifyInstance) {
  app.register(menuRoutes)
  app.register(cartRoutes)
  app.register(orderRoutes)
  app.register(clientRoutes)
}
