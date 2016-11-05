export interface IPaymentMethod {
  type: string;
  amount: number;
  pay(amount: number): boolean;
  process();
}

export class Card implements IPaymentMethod {
  private _name: string;
  private _cardNumber: number;
  private _expiry: Date;
  private _amount: number = 0;

  constructor(name: string, cardNumber: number, expiry: Date) {
    this._name = name;
    this._cardNumber = cardNumber;
    this._expiry = expiry;
  }

  pay(amount: number): boolean { this._amount = amount; return true; }
  process() { this._amount = 0; return true; }
  get type(): string { return 'card'; }
  get amount() { return this._amount; }
  get name() { return this._name; }
  get cardNumber() { return this._cardNumber; }
  get expiry() { return this._expiry; }

}

export class Cash implements IPaymentMethod {
  private _amount: number = 0;
  pay(amount: number): boolean {
    if (this._amount !== 0) {
      this._amount += amount;
    } else { this._amount = amount; }
    return true;
  }
  process() { this._amount = 0; return true; }

  get type(): string { return 'cash'; }
  get amount(): number { return this._amount; }
}

export default class Payment {
  private _method: IPaymentMethod;
  pay(amount: number): boolean { return this._method.pay(amount); }
  isCash(): boolean { return this._method.type === 'cash'; }
  isCard(): boolean { return this._method.type === 'card'; }
  isNFC(): boolean { return this._method.type === 'nfc'; }
  cancel() { this._method.amount = 0; };
  process(): boolean { return this._method.process(); }
  set method(method: IPaymentMethod) { this._method = method; }
  get method(): IPaymentMethod { return this._method; }
  get type(): string { return this._method.type; }
  get value(): number { return this._method.amount; }
}