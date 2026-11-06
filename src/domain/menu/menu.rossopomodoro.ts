import { MenuItem, Ingredient, Size } from './menu.js';

export const RossopomodorosPrices = new Map<MenuItem, number>([
  [MenuItem.MARGHERITA, 8],
  [MenuItem.NAPOLI, 10],
  [MenuItem.DIAVOLA, 13],
  [MenuItem.FUNGHI, 15],
  [MenuItem.ORIENTALE, 14],
]);

export const RossopomodoroRecipes = new Map<MenuItem, Ingredient[]>([
  [MenuItem.MARGHERITA, [Ingredient.MOZARELLA]],
  [MenuItem.NAPOLI, [Ingredient.MOZARELLA, Ingredient.HAM, Ingredient.OLIVES]],
  [MenuItem.DIAVOLA, [Ingredient.MOZARELLA, Ingredient.PEPPERONI, Ingredient.OLIVES]],
  [MenuItem.FUNGHI, [Ingredient.MOZARELLA, Ingredient.MUSHROOMS, Ingredient.OLIVES]],
  [MenuItem.ORIENTALE, [Ingredient.MOZARELLA, Ingredient.PEPPERONI, Ingredient.HAM]],
]);

export const RossopomodoroSizeCosts = new Map<Size, number>([
  [Size.SMALL, 0.8],
  [Size.LARGE, 1.3],
  [Size.XTRA_LARGE, 1.5],
]);
