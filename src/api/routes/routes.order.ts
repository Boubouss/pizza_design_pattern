import { randomUUID } from 'crypto'
import type { FastifyInstance } from 'fastify'
import { restaurants, carts, clients, orderRepository, ordersById } from '../context.js'
import { Order, StatusOrder } from '../../domain/order/order.js'
import { StandardDiscount, HappyHourDiscount, LoyaltyDiscount, PromotionCodeDiscount } from '../../domain/order/order.discount.js'
import type { OrderDiscountStrategy } from '../../domain/order/order.discount.js'
import { OrderValidatorFactory } from '../../domain/order/validator/order.validator.js'
import { EmailListener, SmsListener } from '../../pattern/observer/observer.listeners.js'
import { createOrderSchema, updateOrderStatusSchema } from '../validation/schema.js'

function getDiscountStrategy(type?: string, value?: number): OrderDiscountStrategy {
  switch (type) {
    case 'happy_hour': return new HappyHourDiscount()
    case 'loyalty': return new LoyaltyDiscount()
    case 'promotion_code': return new PromotionCodeDiscount(value ?? 0)
    default: return new StandardDiscount()
  }
}

export async function orderRoutes(app: FastifyInstance) {
  app.post('/orders', { schema: createOrderSchema }, async (request, reply) => {
    const { cartId, clientId, restaurant, deliveryAddress, discount } = request.body as {
      cartId: string
      clientId: string
      restaurant: string
      deliveryAddress: string
      discount?: { type: string; value?: number }
    }

    const cart = carts.get(cartId)
    if (!cart) return reply.code(404).send({ error: 'Cart not found' })

    const client = clients.get(clientId)
    if (!client) return reply.code(404).send({ error: 'Client not found' })

    const rest = restaurants.get(restaurant.toLowerCase())
    if (!rest) return reply.code(404).send({ error: 'Restaurant not found' })

    const discountStrategy = getDiscountStrategy(discount?.type, discount?.value)
    const order = new Order(
      randomUUID(),
      rest,
      discountStrategy,
      cart,
      deliveryAddress,
      new Date(),
      client,
    )

    order.getPublisher().attach(new EmailListener())
    order.getPublisher().attach(new SmsListener())

    const validator = OrderValidatorFactory.createValidatorChain(order)
    if (!validator.validate()) {
      return reply.code(400).send({ error: 'Order validation failed' })
    }

    orderRepository.saveOrder(order)
    ordersById.set(order.getId(), order)
    carts.delete(cartId)

    return { orderId: order.getId(), total: order.calculateTotal() }
  })

  app.get('/orders/:orderId', async (request, reply) => {
    const { orderId } = request.params as { orderId: string }
    const order = ordersById.get(orderId)
    if (!order) return reply.code(404).send({ error: 'Order not found' })

    return {
      orderId: order.getId(),
      status: order.getStatus(),
      total: order.calculateTotal(),
      restaurant: order.getRestaurant().getName(),
      deliveryAddress: order.getDeliveryAddress(),
      pizzas: order.getCart().getPizzas().map(p => ({
        size: p.getSize(),
        ingredients: p.getIngredients(),
        price: p.calculatePrice(),
      })),
    }
  })

  app.patch('/orders/:orderId/status', { schema: updateOrderStatusSchema }, async (request, reply) => {
    const { orderId } = request.params as { orderId: string }
    const { status } = request.body as { status: string }

    const order = ordersById.get(orderId)
    if (!order) return reply.code(404).send({ error: 'Order not found' })

    order.setStatus(status as StatusOrder)
    return { orderId: order.getId(), status: order.getStatus() }
  })
}
