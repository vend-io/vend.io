import { EventEmitter } from 'fbemitter';

/** A payment method interface */
export interface IPaymentMethod {
  /** Stores the payment method type */
  type: string;
  /** Stores the amount paid */
  amount: number;
  /** Stores the change to return (if applicable) */
  change: number;
  /** Starts a transaction */
  pay(amount: number): boolean;
  /** Processes the transaction */
  process(amount: number): boolean;
}

/** Represents a payment method for card */
export class Card implements IPaymentMethod {
  private _amount: number = 0;
  private _cardNumber: number;
  private _expiry: Date;
  private _name: string;
  private _change: number = 0;
  /**
   * @param {string} name The name on the card
   * @param {number} cardNumber The number on the card
   * @param {Date} expiry The expiry date on the card
   */
  constructor(name: string, cardNumber: number, expiry: Date) {
    this._cardNumber = cardNumber;
    this._expiry = expiry;
    this._name = name;
  }
  /**
   * Starts a transaction
   * @param {number} amount The amount to pay
   */
  pay(amount: number): boolean { this._amount = amount; return true; }
  /** Processes the transaction */
  process(amount: number): boolean { this._amount = 0; return true; }

  /** The amount paid */
  get amount() { return this._amount; }
  /** The number on the card */
  get cardNumber() { return this._cardNumber; }
  /** The expiry date on the card */
  get expiry() { return this._expiry; }
  /** The name on the card */
  get name() { return this._name; }
  /** The payment method type */
  get type(): string { return 'card'; }
  /** The money to return */
  get change(): number { return this._change; }

}

/** Represents a payment method for cash */
export class Cash implements IPaymentMethod {
  private _amount: number = 0;
  private _change: number = 0;
  /**
  * Starts a transaction
  * @param {number} amount The amount to pay
  */
  pay(amount: number): boolean {
    if (this._amount !== 0) { this._amount += amount; }
    else { this._amount = amount; }
    return true;
  }
  /** Processes the transaction */
  process(amount: number): boolean { this._change = this._amount - amount; this._amount = 0; return true; }
  /** The amount paid */
  get amount(): number { return this._amount; }
  /** The payment method type */
  get type(): string { return 'cash'; }
  /** The money to return */
  get change(): number { return this._change; }
}

/** Represents a payment/transaction */
export default class Payment {
  /** Stores the payment method */
  method: IPaymentMethod;
  emitter: EventEmitter = new EventEmitter();

  /** Cancels the transaction */
  cancel() { this.method.amount = 0; this.emitter.emit('cancel'); };
  /** Determines if the current payment method is card */
  isCard(): boolean { return this.method.type === 'card'; }
  /** Determines if the current payment method is cash */
  isCash(): boolean { return this.method.type === 'cash'; }
  // isNFC(): boolean { return this.method.type === 'nfc'; }
  /**
  * Starts a transaction
  * @param {number} amount The amount to pay
  */
  pay(amount: number): boolean {
    let success = false;
    this.emitter.emit('payment', amount, success = this.method.pay(amount));
    return success;
  }
  /** Processes the transaction */
  process(amount: number): boolean {
    let success = false;
    this.emitter.emit('process', amount, this.method.change, success = this.method.process(amount));
    return success;
  }
  onPayment(listener: Function): Payment { this.emitter.addListener('payment', listener, this); return this; }
  onProcess(listener: Function): Payment { this.emitter.addListener('process', listener, this); return this; }
  onCancel(listener: Function): Payment { this.emitter.addListener('cancel', listener, this); return this; }

  /** The payment method type */
  get type(): string { return this.method.type; }
  /** The total value of payment */
  get value(): number { return this.method.amount; }
  /** The remaining change from a difference */
  get change(): number { return Math.abs(this.method.change); }

}