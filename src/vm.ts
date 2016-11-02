import { State, InitialState, HasMoneyState, HasSelectedState } from './state';
import Inventory from './inventory';
import Selection from './selection';
import { Payment, Cash, Card } from './payment';
import * as FS from 'fs';
import * as Path from 'path';

const configurationFile = FS.readFileSync(`${Path.resolve(__dirname, '../')}/vmconfig.json`, 'utf8');
const options = JSON.parse(require('strip-json-comments')(configurationFile));

export class VM {
  inventory: Inventory;
  payment: Payment;
  selection: Selection;
  options: any = options;
  private _current: State;
  private _initialState: InitialState;
  private _hasMoneyState: HasMoneyState;
  private _hasSelectedState: HasSelectedState;
  constructor() {
    this._initialState = new InitialState(this);
    this._hasMoneyState = new HasMoneyState(this);
    this._hasSelectedState = new HasSelectedState(this);
    this._current = this._initialState;
    this.payment = new Payment();
    this.inventory = new Inventory();
    this.selection = new Selection();
  }
  // Operations
  selectById(id: string) { this._current.selectById(id); }
  pay(amount: number) { this._current.pay(amount); }
  cancel() { this._current.cancel(); }

  setPaymentMethod(method: string, details?: { name: string, cardNumber: number, expiry: Date }) {
    switch (method) {
      case 'cash': this.payment.method = new Cash(); break;
      case 'card': this.payment.method = new Card(details.name, details.cardNumber, details.expiry); break;
    }
  }

  set state(state: string) {
    switch (state.toLowerCase().replace('state', '')) {
      case 'initial': this._current = this._initialState; break;
      case 'hasmoney': this._current = this._hasMoneyState; break;
      case 'hasselected': this._current = this._hasSelectedState; break;
      default: break;
    }
  }

  get state() { return this._current.name; }

}