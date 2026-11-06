import { Ingredient, Size, Base, MenuItem } from '../../domain/menu/menu.js'
import { StatusOrder } from '../../domain/order/order.js'

const ingredients = Object.values(Ingredient)
const sizes = Object.values(Size)
const bases = Object.values(Base)
const menuItems = Object.values(MenuItem)
const statuses = Object.values(StatusOrder)
const restaurants = ['damichele', 'rossopomodoro', 'pizzium']

export const createClientSchema = {
  body: {
    type: 'object',
    required: ['name'],
    additionalProperties: false,
    properties: {
      name: { type: 'string', minLength: 1 },
    },
  },
}

export const addPremadePizzaSchema = {
  body: {
    type: 'object',
    required: ['restaurant', 'type', 'size'],
    additionalProperties: false,
    properties: {
      restaurant: { type: 'string', enum: restaurants },
      type: { type: 'string', enum: menuItems },
      size: { type: 'string', enum: sizes },
    },
  },
}

export const addCustomPizzaSchema = {
  body: {
    type: 'object',
    required: ['restaurant', 'size', 'ingredients'],
    additionalProperties: false,
    properties: {
      restaurant: { type: 'string', enum: restaurants },
      size: { type: 'string', enum: sizes },
      base: { type: 'string', enum: bases },
      ingredients: {
        type: 'array',
        items: { type: 'string', enum: ingredients },
        minItems: 1,
      },
    },
  },
}

export const createOrderSchema = {
  body: {
    type: 'object',
    required: ['cartId', 'clientId', 'restaurant', 'deliveryAddress'],
    additionalProperties: false,
    properties: {
      cartId: { type: 'string', minLength: 1 },
      clientId: { type: 'string', minLength: 1 },
      restaurant: { type: 'string', enum: restaurants },
      deliveryAddress: { type: 'string', minLength: 1 },
      discount: {
        type: 'object',
        required: ['type'],
        additionalProperties: false,
        properties: {
          type: { type: 'string', enum: ['standard', 'happy_hour', 'loyalty', 'promotion_code'] },
          value: { type: 'number', minimum: 0, maximum: 1 },
        },
      },
    },
  },
}

export const updateOrderStatusSchema = {
  body: {
    type: 'object',
    required: ['status'],
    additionalProperties: false,
    properties: {
      status: { type: 'string', enum: statuses },
    },
  },
}
