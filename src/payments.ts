import type { Paypal, Stripe, CB } from "./dependencies/paymentMethods.js";

export interface PaymentMethod {
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentMethod {
  paypal: Paypal;
  currency: String;
  constructor(paypal: Paypal, currency: String) {
    this.paypal = paypal;
    this.currency = currency;
  }
  pay(amount: number): void {
    this.paypal.PaypalPay(amount, this.currency);
  }
}

export class StripeAdapter implements PaymentMethod {
  stripe: Stripe;
  constructor(stripe: Stripe) {
    this.stripe = stripe;
  }
  pay(amount: number): void {
    this.stripe.stripePay(amount);
  }
}

export class CBAdapter implements PaymentMethod {
  cb: CB;
  bankName: String;
  constructor(cb: CB, bankName: String) {
    this.cb = cb;
    this.bankName = bankName;
  }
  pay(amount: number): void {
    this.cb.payByCB(amount, this.bankName);
  }
}
