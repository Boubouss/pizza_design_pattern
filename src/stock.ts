import { Ingredient } from "./ingredients.js";
import { type Pizza } from "./pizza.js";
export class Stock {
  private stock: Map<Ingredient, boolean>;
  constructor(menu: Map<Ingredient, boolean>) {
    this.stock = menu;
  }

  public addPizza(ingredient: Ingredient): void {
    this.stock.set(ingredient, true);
  }

  public removePizza(ingredient: Ingredient): void {
    this.stock.delete(ingredient);
  }

  public isInStock(pizza: Pizza): boolean {
    for (const ingredient of pizza.getIngredients()) {
      if (!this.stock.get(ingredient)) {
        return false;
      }
    }
    return true;
  }
}
