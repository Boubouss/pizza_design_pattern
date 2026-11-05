import type { Pizza } from '../pizza.js'

export interface Snapshot<T> {
  getState(): T
}

export class CartSnapshot implements Snapshot<Pizza[]> {
  constructor(private state: Pizza[]) {}

  getState(): Pizza[] {
    return this.state
  }
}
