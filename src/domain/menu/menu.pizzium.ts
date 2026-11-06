import { MenuItem, Ingredient, Size } from './menu.js';

export const PizziumPrices = new Map<MenuItem, number>([
  [MenuItem.MARGHERITA, 10],
  [MenuItem.NAPOLI, 12],
  [MenuItem.DIAVOLA, 15],
  [MenuItem.FUNGHI, 17],
  [MenuItem.KEBAB, 13],
]);

export const PizziumRecipes = new Map<MenuItem, Ingredient[]>([
  [MenuItem.MARGHERITA, [Ingredient.MOZARELLA]],
  [MenuItem.NAPOLI, [Ingredient.MOZARELLA, Ingredient.HAM]],
  [MenuItem.DIAVOLA, [Ingredient.MOZARELLA, Ingredient.PEPPERONI]],
  [MenuItem.FUNGHI, [Ingredient.MOZARELLA, Ingredient.MUSHROOMS, Ingredient.GORGONZOLA]],
  [MenuItem.KEBAB, [Ingredient.MOZARELLA, Ingredient.PEPPERONI, Ingredient.HAM]],
]);

export const PizziumSizeCosts = new Map<Size, number>([
  [Size.MEDIUM, 1.2],
]);
