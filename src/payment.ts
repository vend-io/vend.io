export interface IPaymentMethod {
  type: string;
  amount: number;

  pay(amount: number): boolean;
  process();
}

export class Card implements IPaymentMethod {
  private _amount: number = 0;
  private _cardNumber: number;
  private _expiry: Date;
  private _name: string;

  constructor(name: string, cardNumber: number, expiry: Date) {
    this._cardNumber = cardNumber;
    this._expiry = expiry;
    this._name = name;
  }

  pay(amount: number): boolean { this._amount = amount; return true; }
  process() { this._amount = 0; return true; }

  get amount() { return this._amount; }
  get cardNumber() { return this._cardNumber; }
  get expiry() { return this._expiry; }
  get name() { return this._name; }
  get type(): string { return 'card'; }

}

export class Cash implements IPaymentMethod {
  private _amount: number = 0;

  pay(amount: number): boolean {
    if (this._amount !== 0) { this._amount += amount; }
    else { this._amount = amount; }
    return true;
  }
  process() { this._amount = 0; return true; }

  get amount(): number { return this._amount; }
  get type(): string { return 'cash'; }
}

export default class Payment {
  method: IPaymentMethod;

  cancel() { this.method.amount = 0; };
  isCard(): boolean { return this.method.type === 'card'; }
  isCash(): boolean { return this.method.type === 'cash'; }
  // isNFC(): boolean { return this.method.type === 'nfc'; }
  pay(amount: number): boolean { return this.method.pay(amount); }
  process(): boolean { return this.method.process(); }

  get type(): string { return this.method.type; }
  get value(): number { return this.method.amount; }

}