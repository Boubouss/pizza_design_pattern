import type { FastifyInstance } from 'fastify'
import { restaurants, carts, createCart } from '../context.js'
import { addPremadePizzaSchema, addCustomPizzaSchema } from '../validation/schema.js'
import type { Size, Ingredient, Base, MenuItem } from '../../domain/menu/menu.js'

export async function cartRoutes(app: FastifyInstance) {
  app.post('/cart', async () => {
    const id = createCart()
    return { cartId: id }
  })

  app.get('/cart/:id', async (request, reply) => {
    const { id } = request.params as { id: string }
    const cart = carts.get(id)
    if (!cart) return reply.code(404).send({ error: 'Cart not found' })

    return {
      cartId: id,
      pizzas: cart.getPizzas().map(p => ({
        size: p.getSize(),
        ingredients: p.getIngredients(),
        price: p.calculatePrice(),
      })),
      total: cart.calculatePrice(),
    }
  })

  app.post('/cart/:id/pizza/premade', { schema: addPremadePizzaSchema }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const { restaurant, type, size } = request.body as { restaurant: string; type: string; size: string }

    const cart = carts.get(id)
    if (!cart) return reply.code(404).send({ error: 'Cart not found' })

    const rest = restaurants.get(restaurant.toLowerCase())
    if (!rest) return reply.code(404).send({ error: 'Restaurant not found' })

    try {
      const pizza = rest.getFactory().createPizza(type as MenuItem, size as Size)
      cart.addPizza(pizza)
      return { cartId: id, total: cart.calculatePrice() }
    } catch (e) {
      return reply.code(400).send({ error: (e as Error).message })
    }
  })

  app.post('/cart/:id/pizza/custom', { schema: addCustomPizzaSchema }, async (request, reply) => {
    const { id } = request.params as { id: string }
    const { restaurant, size, ingredients, base } = request.body as {
      restaurant: string
      size: string
      ingredients: string[]
      base?: string
    }

    const cart = carts.get(id)
    if (!cart) return reply.code(404).send({ error: 'Cart not found' })

    const rest = restaurants.get(restaurant.toLowerCase())
    if (!rest) return reply.code(404).send({ error: 'Restaurant not found' })

    try {
      const builder = rest.getFactory().createPizzaBuilder(size as Size)
      if (base) builder.setBase(base as Base)
      for (const ingredient of ingredients) {
        builder.addIngredient(ingredient as Ingredient)
      }
      cart.addPizza(builder.build())
      return { cartId: id, total: cart.calculatePrice() }
    } catch (e) {
      return reply.code(400).send({ error: (e as Error).message })
    }
  })

  app.post('/cart/:id/undo', async (request, reply) => {
    const { id } = request.params as { id: string }
    const cart = carts.get(id)
    if (!cart) return reply.code(404).send({ error: 'Cart not found' })

    try {
      cart.undo()
      return { cartId: id, total: cart.calculatePrice() }
    } catch (e) {
      return reply.code(400).send({ error: (e as Error).message })
    }
  })
}
