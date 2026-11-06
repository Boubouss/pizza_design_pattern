import type { Event, Listener } from './observer.js'

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
