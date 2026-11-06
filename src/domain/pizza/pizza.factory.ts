import { PizzaBuilder } from "./pizza.builder.js";
import type { Pizza } from './pizza.js';
import { CustomPizza, PreMadePizza } from './pizza.js';
import type { Size, MenuItem } from '../menu/menu.js';
import { AdditivePriceStrategy, MultiplicativePriceStrategy } from './pizza.price.js';
import { DaMichelePrices, DaMicheleRecipes, DaMicheleSizeCosts } from '../menu/menu.damichele.js';
import { RossopomodorosPrices, RossopomodoroRecipes, RossopomodoroSizeCosts } from '../menu/menu.rossopomodoro.js';
import { PizziumPrices, PizziumRecipes, PizziumSizeCosts } from '../menu/menu.pizzium.js';


export interface PizzaFactory {
  createPizzaBuilder(size: Size): PizzaBuilder;
  createPizza(type: MenuItem, size: Size): Pizza
}

export class DaMicheleFactory implements PizzaFactory {
  public createPizzaBuilder(size: Size) {
    if (!DaMicheleSizeCosts.has(size))
      throw new Error(`Invalid size for DaMichele`);
    return new PizzaBuilder(new CustomPizza(size, DaMicheleSizeCosts.get(size)!, new AdditivePriceStrategy()));
  }

  public createPizza(type: MenuItem, size: Size) {
    if (!DaMicheleSizeCosts.has(size))
      throw new Error(`Invalid size for DaMichele`);
    if (!DaMichelePrices.has(type))
      throw new Error(`Invalid pizza type for DaMichele`);
    return new PreMadePizza(type, DaMichelePrices.get(type)!, size, DaMicheleSizeCosts.get(size)!, new AdditivePriceStrategy(), DaMicheleRecipes.get(type)!);
  }
}

export class RossopomodoroFactory implements PizzaFactory {
  public createPizzaBuilder(size: Size) {
    if (!RossopomodoroSizeCosts.has(size))
      throw new Error(`Invalid size for Rossopomodoro`);
    return new PizzaBuilder(new CustomPizza(size, RossopomodoroSizeCosts.get(size)!, new MultiplicativePriceStrategy()));
  }

  public createPizza(type: MenuItem, size: Size) {
    if (!RossopomodoroSizeCosts.has(size))
      throw new Error(`Invalid size for Rossopomodoro`);
    if (!RossopomodorosPrices.has(type))
      throw new Error(`Invalid pizza type for Rossopomodoro`);
    return new PreMadePizza(type, RossopomodorosPrices.get(type)!, size, RossopomodoroSizeCosts.get(size)!, new MultiplicativePriceStrategy(), RossopomodoroRecipes.get(type)!);
  }
}

export class PizziumFactory implements PizzaFactory {
  public createPizzaBuilder(size: Size) {
    if (!PizziumSizeCosts.has(size))
      throw new Error(`Invalid size for Pizzium`);
    return new PizzaBuilder(new CustomPizza(size, PizziumSizeCosts.get(size)!, new MultiplicativePriceStrategy()));
  }

  public createPizza(type: MenuItem, size: Size) {
    if (!PizziumSizeCosts.has(size))
      throw new Error(`Invalid size for Pizzium`);
    if (!PizziumPrices.has(type))
      throw new Error(`Invalid pizza type for Pizzium`);
    return new PreMadePizza(type, PizziumPrices.get(type)!, size, PizziumSizeCosts.get(size)!, new MultiplicativePriceStrategy(), PizziumRecipes.get(type)!);
  }
}
