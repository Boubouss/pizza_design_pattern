import { DaMicheleFactory } from './factory.js';
import { Cart } from './cart.js';
import { Order, StatusOrder } from './order.js';
import { Restaurant } from './restaurant.js';
import { Stock } from './stock.js';
import { StandardPricing } from './pricing.js';
import { EmailListener, SmsListener } from './observer/listener.js';

// Setup restaurant
const stock = new Stock(new Map([["margherita", true], ["4 fromages", true]]));
const factory = new DaMicheleFactory();
const restaurant = new Restaurant(factory, stock, "Da Michele", {
  open: new Date("2024-01-01T11:00:00"),
  close: new Date("2024-01-01T23:00:00"),
});

// Setup cart
const pizza1 = factory.createPizza("margherita", "M");
const pizza2 = factory.createPizza("4 fromages", "L");
const cart = new Cart([pizza1, pizza2]);

// Setup order
const order = new Order("order-001", restaurant, new StandardPricing(), cart, "12 rue de la Paix", new Date());

// Attach listeners
const emailListener = new EmailListener();
const smsListener = new SmsListener();
order.getPublisher().attach(emailListener);
order.getPublisher().attach(smsListener);

console.log("--- Status initial:", order.getStatus());

// Changer le status → les listeners doivent être notifiés
console.log("\n--- Passage à CLOSE ---");
order.setStatus(StatusOrder.CLOSE);

// Vérifier le detach
console.log("\n--- Detach SMS, passage à PENDING ---");
order.getPublisher().detach(smsListener);
order.setStatus(StatusOrder.PENDING);
// Seul l'email doit s'afficher
