import type { Pizza } from '../pizza/pizza.js'
import type { Snapshot } from '../../pattern/memento/memento.js'

export class CartSnapshot implements Snapshot<Pizza[]> {
  constructor(private state: Pizza[]) {}

  getState(): Pizza[] {
    return this.state
  }
}

export class CartHistory {
  constructor(private snapshots: CartSnapshot[] = []) {}

  save(snap: CartSnapshot): void {
    if (this.snapshots.length >= 10) {
      console.log("error: historique limite a 10 snapshots")
      return
    }
    this.snapshots.push(snap)
  }

  restore(): CartSnapshot {
    if (!this.snapshots.length)
      throw new Error("No snapshot to restore")
    return this.snapshots.pop()!
  }
}
