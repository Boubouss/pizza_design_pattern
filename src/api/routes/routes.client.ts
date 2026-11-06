import { randomUUID } from 'crypto'
import type { FastifyInstance } from 'fastify'
import { clients, orderRepository } from '../context.js'
import { Client } from '../../domain/client/client.js'
import { createClientSchema } from '../validation/schema.js'

export async function clientRoutes(app: FastifyInstance) {
  app.post('/clients', { schema: createClientSchema }, async (request) => {
    const { name } = request.body as { name: string }
    const id = randomUUID()
    const client = new Client(id, name)
    clients.set(id, client)
    return { clientId: id, name }
  })

  app.get('/clients/:clientId/orders', async (request, reply) => {
    const { clientId } = request.params as { clientId: string }
    const client = clients.get(clientId)
    if (!client) return reply.code(404).send({ error: 'Client not found' })

    const orders = orderRepository.getClientOrders(client)
    return orders.map(order => ({
      orderId: order.getId(),
      status: order.getStatus(),
      total: order.calculateTotal(),
      restaurant: order.getRestaurant().getName(),
      orderTime: order.getOrderTime(),
    }))
  })
}
