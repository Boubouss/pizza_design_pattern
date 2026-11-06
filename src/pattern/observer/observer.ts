export interface Event {
  message(): string;
}

export interface Listener {
  update(event: Event): void;
}

export class Publisher {
  private listeners: Listener[] = [];

  attach(listener: Listener): void {
    if (this.listeners.includes(listener))
      return;
    this.listeners.push(listener)
  }

  detach(listener: Listener): void {
    const index = this.listeners.indexOf(listener)
    if (index == -1)
      return;
    this.listeners.splice(index, 1)
  }

  notify(event: Event): void {
    for (const listener of this.listeners) {
      listener.update(event)
    }
  }
}

