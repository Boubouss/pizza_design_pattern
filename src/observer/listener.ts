import type { Event } from './event.js'

export interface Listener {
  update(event: Event): void;
}

export class EmailListener implements Listener {
  update(event: Event) {
    console.log("email: " + event.message())
  }
}

export class SmsListener implements Listener {
  update(event: Event) {
    console.log("sms: " + event.message())
  }
}
