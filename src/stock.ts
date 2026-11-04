export class Stock {
  private stock: Map<string, boolean>;
  constructor(menu: Map<string, boolean>) {
    this.stock = menu;
  }

  public addPizza(pizza: string): void {
    this.stock.set(pizza, true);
  }

  public removePizza(pizza: string): void {
    this.stock.delete(pizza);
  }

  public isInStock(pizza: string): boolean {
    return this.stock.get(pizza) ?? false;
  }
}
