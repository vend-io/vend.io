import State from './state';
import Inventory from './inventory';
import Selection from './selection';
import Payment from './payment';
import Options from './options';

export class Core {
  inventory: Inventory;
  payment: Payment;
  selection: Selection;
  options: Options;
  state: State;
  constructor() {
    this.options = new Options();
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