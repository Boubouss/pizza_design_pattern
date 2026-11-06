import type { Pizza } from './pizza.js';
import { CustomPizza } from './pizza.js';
import { Ingredient, Size, Base } from "../menu/menu.js";

export class PizzaBuilder {
  private pizza: CustomPizza;

  constructor(pizza: CustomPizza) {
    this.pizza = pizza;
  }

  public setBase(base: Base): PizzaBuilder {
    this.pizza.setBase(base);
    return this;
  }

  public addIngredient(ingredient: Ingredient): PizzaBuilder {
    this.pizza.addIngredient(ingredient);
    return this;
  }

  public removeIngredient(ingredient: Ingredient): PizzaBuilder {
    this.pizza.removeIngredient(ingredient);
    return this;
  }

  build(): Pizza {
    const pizza = this.pizza;
    this.pizza = new CustomPizza(this.pizza.getSize(), this.pizza.getSizeCost(), this.pizza.getPriceStrategy());
    return pizza;
  } 
}
