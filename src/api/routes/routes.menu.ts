import type { FastifyInstance } from 'fastify'
import { restaurants } from '../context.js'
import { DaMichelePrices, DaMicheleRecipes, DaMicheleSizeCosts } from '../../domain/menu/menu.damichele.js'
import { RossopomodorosPrices, RossopomodoroRecipes, RossopomodoroSizeCosts } from '../../domain/menu/menu.rossopomodoro.js'
import { PizziumPrices, PizziumRecipes, PizziumSizeCosts } from '../../domain/menu/menu.pizzium.js'
import { IngredientPrices, Base } from '../../domain/menu/menu.js'

const menuData = new Map([
  ['damichele', { prices: DaMichelePrices, recipes: DaMicheleRecipes, sizes: DaMicheleSizeCosts }],
  ['rossopomodoro', { prices: RossopomodorosPrices, recipes: RossopomodoroRecipes, sizes: RossopomodoroSizeCosts }],
  ['pizzium', { prices: PizziumPrices, recipes: PizziumRecipes, sizes: PizziumSizeCosts }],
])

export async function menuRoutes(app: FastifyInstance) {
  app.get('/menu/:restaurant', async (request, reply) => {
    const { restaurant } = request.params as { restaurant: string }
    const data = menuData.get(restaurant.toLowerCase())
    const rest = restaurants.get(restaurant.toLowerCase())

    if (!data || !rest) {
      return reply.code(404).send({ error: 'Restaurant not found' })
    }

    return {
      name: rest.getName(),
      pizzas: [...data.prices.entries()].map(([type, basePrice]) => ({
        type,
        basePrice,
        ingredients: data.recipes.get(type) ?? [],
      })),
      sizes: [...data.sizes.entries()].map(([size, cost]) => ({ size, cost })),
      ingredients: [...IngredientPrices.entries()].map(([name, price]) => ({ name, price })),
      bases: Object.values(Base),
    }
  })
}
