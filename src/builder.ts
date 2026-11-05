import {
  type Pizza,
  DaMichelePizza,
  PizziumPizza,
  RossopomodoroPizza,
} from "./pizza.js";
import { Ingredient, Size, Base } from "./ingredients.js";

export abstract class PizzaBuilder {
  protected pizza: Pizza;

  constructor(pizza: Pizza) {
    this.pizza = pizza;
  }

  public setSize(size: Size): PizzaBuilder {
    this.pizza.setSize(size);
    return this;
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

  abstract build(): Pizza;
}

export class DaMichelePizzaBuilder extends PizzaBuilder {
  constructor() {
    super(new DaMichelePizza());
  }
  build(): Pizza {
    const pizza = this.pizza;
    this.pizza = new DaMichelePizza();
    return pizza;
  }
}

export class RossopomodoroPizzaBuilder extends PizzaBuilder {
  constructor() {
    super(new RossopomodoroPizza());
  }
  build(): Pizza {
    const pizza = this.pizza;
    this.pizza = new RossopomodoroPizza();
    return pizza;
  }
}

export class PizziumPizzaBuilder extends PizzaBuilder {
  constructor() {
    super(new PizziumPizza());
  }
  build(): Pizza {
    const pizza = this.pizza;
    this.pizza = new PizziumPizza();
    return pizza;
  }
}
