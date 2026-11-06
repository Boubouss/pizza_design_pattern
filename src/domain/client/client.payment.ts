import type { Paypal, Stripe, CB } from "../../../dependencies/dependency.payment.js";

export interface PaymentMethod {
  pay(amount: number): void;
}

export class PayPalAdapter implements PaymentMethod {
  constructor(private paypal: Paypal, private currency: string) {}
  pay(amount: number): void {
    this.paypal.PaypalPay(amount, this.currency);
  }
}

export class StripeAdapter implements PaymentMethod {
  constructor(private stripe: Stripe) {}
  pay(amount: number): void {
    this.stripe.stripePay(amount);
  }
}

export class CBAdapter implements PaymentMethod {
  constructor(private cb: CB, private bankName: string) {}
  pay(amount: number): void {
    this.cb.payByCB(amount, this.bankName);
  }
}
