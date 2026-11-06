import { MenuItem, Ingredient, Size } from './menu.js';

export const DaMichelePrices = new Map<MenuItem, number>([
  [MenuItem.MARGHERITA, 9],
  [MenuItem.NAPOLI, 11],
  [MenuItem.DIAVOLA, 14],
  [MenuItem.FUNGHI, 16],
  [MenuItem.MARINARA, 10],
]);

export const DaMicheleRecipes = new Map<MenuItem, Ingredient[]>([
  [MenuItem.MARGHERITA, [Ingredient.MOZARELLA]],
  [MenuItem.NAPOLI, [Ingredient.MOZARELLA, Ingredient.HAM]],
  [MenuItem.DIAVOLA, [Ingredient.MOZARELLA, Ingredient.PEPPERONI]],
  [MenuItem.FUNGHI, [Ingredient.MOZARELLA, Ingredient.MUSHROOMS]],
  [MenuItem.MARINARA, [Ingredient.OLIVES]],
]);

export const DaMicheleSizeCosts = new Map<Size, number>([
  [Size.SMALL, -2],
  [Size.LARGE, 3],
  [Size.XTRA_LARGE, 5],
]);
