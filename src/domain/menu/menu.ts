export enum MenuItem {
  MARGHERITA = "Margherita",
  NAPOLI = "Napoli",
  DIAVOLA = "Diavola",
  FUNGHI = "Funghi",
  ORIENTALE = "Orientale",
  KEBAB = "Kebab",
  MARINARA = "Marinara",
}

export enum Ingredient {
  MOZARELLA = "Mozarella",
  PEPPERONI = "Pepperoni",
  HAM = "Ham",
  MUSHROOMS = "Mushrooms",
  OLIVES = "Olives",
  GORGONZOLA = "Gorgonzola",
}

export const IngredientPrices = new Map<Ingredient, number>([
  [Ingredient.MOZARELLA, 1.5],
  [Ingredient.PEPPERONI, 2.0],
  [Ingredient.HAM, 2.0],
  [Ingredient.MUSHROOMS, 1.0],
  [Ingredient.OLIVES, 1.0],
  [Ingredient.GORGONZOLA, 2.5],
]);

export enum Base {
  TOMATO = "Tomato",
  CREAM = "Cream",
}

export enum Size {
  SMALL = "S",
  MEDIUM = "M",
  LARGE = "L",
  XTRA_LARGE = "XL",
}
