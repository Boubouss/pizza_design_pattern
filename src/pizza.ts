export interface Pizza {
  calculatePrice(): number;
  getType(): string;
}
export class DaMichelePizza implements Pizza {
  private size: string;
  private type: string;
  constructor(size: string, type: string) {
    this.size = size;
    this.type = type;
  }
  calculatePrice(): number {
    return 0;
  }
  getType(): string {
    return this.type;
  }
}
export class RossopomodoroPizza implements Pizza {
  private size: string;
  private type: string;
  constructor(size: string, type: string) {
    this.size = size;
    this.type = type;
  }
  calculatePrice(): number {
    return 0;
  }
  getType(): string {
    return this.type;
  }
}
export class PizziumPizza implements Pizza {
  private size: string;
  private type: string;
  constructor(size: string, type: string) {
    this.size = size;
    this.type = type;
  }
  calculatePrice(): number {
    return 0;
  }
  getType(): string {
    return this.type;
  }
}
