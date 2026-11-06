export class Paypal {
  PaypalPay(amount: number, currency: string): void {
    console.log(`Paying ${amount} ${currency} using PayPal`);
  }
}

export class Stripe {
  stripePay(amount: number): void {
    console.log(`Paying ${amount} using Stripe`);
  }
}

export class CB {
  payByCB(amount: number, bankName: string): void {
    console.log(`Paying ${amount} using ${bankName} card`);
  }
}
