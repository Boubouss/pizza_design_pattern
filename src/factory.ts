import {
  type PizzaBuilder,
  DaMichelePizzaBuilder,
  RossopomodoroPizzaBuilder,
  PizziumPizzaBuilder,
} from "./builder.js";



export interface PizzaFactory {
  createPizzaBuilder(): PizzaBuilder;
}

export class DaMicheleFactory implements PizzaFactory {
  public createPizzaBuilder() {
    return new DaMichelePizzaBuilder();
  }
}

export class RossopomodoroFactory implements PizzaFactory {
  public createPizzaBuilder() {
    return new RossopomodoroPizzaBuilder();
  }
}

export class PizziumFactory implements PizzaFactory {
  public createPizzaBuilder() {
    return new PizziumPizzaBuilder();
  }
}
