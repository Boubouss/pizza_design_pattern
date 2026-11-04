import { DaMichelePizza, PizziumPizza, RossopomodoroPizza, type Pizza } from "./pizza.js";

export interface PizzaFactory{
    createPizza(type: string, size: string): Pizza;
}

export class DaMicheleFactory implements PizzaFactory{
   public createPizza(type: string, size: string){
    return new DaMichelePizza(size,type);
   }
}

export class RossopomodoroFactory implements PizzaFactory{
    public createPizza(type: string, size: string){
    return new RossopomodoroPizza(size, type);
   }
}

export class PizziumFactory implements PizzaFactory{
    public createPizza(type: string, size: string){
    return new PizziumPizza(size,type);
   }
}

