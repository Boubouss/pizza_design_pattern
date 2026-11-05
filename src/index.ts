import { DaMicheleFactory } from './factory.js';
import { Cart, CartWithHistory } from './cart.js';
import { Order, StatusOrder } from './order.js';
import { Restaurant } from './restaurant.js';
import { Stock } from './stock.js';
import { StandardPricing } from './pricing.js';
import { EmailListener, SmsListener } from './observer/listener.js';
import { Base, Ingredient, Size } from './ingredients.js';

// Setup restaurant
const stock = new Stock(new Map([
  [Ingredient.MOZARELLA, true],
  [Ingredient.GORGONZOLA, true],
]));
const factory = new DaMicheleFactory();
const restaurant = new Restaurant(factory, stock, "Da Michele", {
  open: new Date("2024-01-01T11:00:00"),
  close: new Date("2024-01-01T23:00:00"),
});

// Setup cart
const pizza1 = factory.createPizzaBuilder()
  .setSize(Size.MEDIUM)
  .setBase(Base.TOMATO)
  .addIngredient(Ingredient.MOZARELLA)
  .build();
const pizza2 = factory.createPizzaBuilder()
  .setSize(Size.LARGE)
  .setBase(Base.CREAM)
  .addIngredient(Ingredient.MOZARELLA)
  .addIngredient(Ingredient.GORGONZOLA)
  .build();
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

// --- Memento ---
console.log("\n--- Memento ---");
const cartWithHistory = CartWithHistory.fromCart(cart);
console.log("Prix des pizzas initiales:", cartWithHistory.getPizzas().map(p => p.calculatePrice()));

cartWithHistory.backup();
console.log("Backup effectué");

const pizza3 = factory.createPizzaBuilder()
  .setSize(Size.SMALL)
  .setBase(Base.TOMATO)
  .addIngredient(Ingredient.MOZARELLA)
  .build();
cartWithHistory.getPizzas().push(pizza3);
console.log("Après ajout d'une pizza:", cartWithHistory.getPizzas().map(p => p.calculatePrice()));

cartWithHistory.undo();
console.log("Après undo:", cartWithHistory.getPizzas().map(p => p.calculatePrice()));
