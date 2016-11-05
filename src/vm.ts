import State from './state';
import Inventory from './inventory';
import Selection from './selection';
import Payment from './payment';
import * as FS from 'fs';
import * as Path from 'path';

const configurationFile = FS.readFileSync(`${Path.resolve(__dirname, '../')}/vmconfig.json`, 'utf8');
const options = JSON.parse(require('strip-json-comments')(configurationFile));

export class VM {
  inventory: Inventory;
  payment: Payment;
  selection: Selection;
  options: any = options;
  state: State;
  constructor() {
    this.payment = new Payment();
    this.inventory = new Inventory();
    this.selection = new Selection();
    this.state = new State(this);
  }
  // Operations
  selectById(id: string) { this.state.selectById(id); }
  pay(amount: number) { this.state.pay(amount); }
  cancel() { this.state.cancel(); }

}