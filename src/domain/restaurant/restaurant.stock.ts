import type { Ingredient } from "../menu/menu.js";
import type { Pizza } from "../pizza/pizza.js";

export class Stock {
  private stock: Set<Ingredient>;

  constructor(ingredients: Set<Ingredient>) {
    this.stock = ingredients;
  }

  public addIngredient(ingredient: Ingredient): void {
    this.stock.add(ingredient);
  }

  public removeIngredient(ingredient: Ingredient): void {
    this.stock.delete(ingredient);
  }

  public isInStock(pizza: Pizza): boolean {
    for (const ingredient of pizza.getIngredients()) {
      if (!this.stock.has(ingredient)) {
        return false;
      }
    }
    return true;
  }
}
