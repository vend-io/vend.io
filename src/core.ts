import State from './state';
import Inventory from './inventory';
import Selection from './selection';
import Payment from './payment';
import { OptionSchema } from './schema';
import * as FS from 'fs';
import * as Path from 'path';

const configurationFile = FS.readFileSync(`${Path.resolve(__dirname, '../')}/vmconfig.json`, 'utf8');
const options = JSON.parse(require('strip-json-comments')(configurationFile));

export class Core {
  inventory: Inventory;
  payment: Payment;
  selection: Selection;
  options: OptionSchema = options;
  state: State;
  constructor() {
    this.payment = new Payment();
    this.inventory = new Inventory();
    this.selection = new Selection();
    this.state = new State(this);
  }
  // Operations
  /**
   * Selects an item in inventory by id
   * @param {string} id The id of the item to select
   */
  selectById(id: string) { this.state.selectById(id); }
  /**
   * Starts a transaction
   * @param {number} amount The amount to pay for the item
   */
  pay(amount: number) { this.state.pay(amount); }
  /** Cancels the current action */
  cancel() { this.state.cancel(); }
}