import { CartSnapshot } from './snapshot.js'

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
      return new CartSnapshot([])

    return this.snapshots.pop()!
  }
}
