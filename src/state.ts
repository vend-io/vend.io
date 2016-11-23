import { Core } from './core';

export interface IState {
  name: string;
  machine?: Core;
  // TODO: selectItemByName(name: string);
  selectById(id: string);
  pay(amount: number);
  cancel();
}
/** An enumeration representing the states */
export enum States {
  IdleState,
  HasMoneyState,
  HasSelectedState,
}

export default class State implements IState {
  private _current: IState;
  private _idleState: IdleState;
  private _hasMoneyState: HasMoneyState;
  private _hasSelectedState: HasSelectedState;
  constructor(machine: Core) {
    this._idleState = new IdleState(machine);
    this._hasMoneyState = new HasMoneyState(machine);
    this._hasSelectedState = new HasSelectedState(machine);
    this.transitionTo(States.IdleState);
  }
  /**
   * Transitions the current state to another state
   * @param {States} state The state to transition to
   */
  transitionTo(state: States) {
    switch (state) {
      case States.IdleState: this._current = this._idleState; break;
      case States.HasMoneyState: this._current = this._hasMoneyState; break;
      case States.HasSelectedState: this._current = this._hasSelectedState; break;
    }
  }

  selectById(id: string) { return this._current.selectById(id); }
  pay(amount: number) { this._current.pay(amount); }
  cancel() { this._current.cancel(); }
  get name(): string { return this._current.name; }
}

export class IdleState implements IState {
  machine: Core;
  constructor(machine: Core) { this.machine = machine; }
  selectById(id: string) {
    /*
      Use Case: The consumer selects an item.
      State: The consumer has not selected an item or inserted a coin.
      The machine should:
        - Notify the consumer if the selected item is sold out.
        - Notify the consumer the cost of the selected item.
        - Store the initial item and transition to HasSelectedState (if selection type is 'multiple').
    */
    const { inventory, selection, options } = this.machine;
    // Notify the consumer if the selected item is sold out.
    if (!inventory.isAvailableById(id)) {
      // Notify the consumer the cost and availability of the selected item.
      if (options.debug) { console.log(`${inventory.findItemById(id).name} is not available.`); }
    } else {
      // Check whether multiple selection is enabled.
      if (this.machine.options.selection.type === 'single') {
        // Restrict the selection amount to 1
        if (selection.count > 0) { selection.clear(); }
        // Store the initial item.
        selection.addItem(inventory.findItemById(id));
        // Notify the consumer the cost and availability of the selected item.
        if (options.debug) { console.log(`Cost of ${inventory.findItemById(id).name} is ${inventory.findItemById(id).cost}`); }
      } else {
        // Store the initial item.
        selection.addItem(inventory.findItemById(id));
        // Transition to HasSelectedState.
        this.machine.state.transitionTo(States.HasSelectedState);
      }
    }
  }
  pay(amount: number) {
    /*
      Use Case: The consumer pays an item.
      State: The consumer has not selected an item.
      The machine should:
        - Validate the payment
        - Transition to HasCashState
        - Notify the consumer if the payment method failed.
    */
    const { payment, options } = this.machine;
    // Validate the payment.
    if (payment.pay(amount)) {
      // Transition to HasCashState.
      this.machine.state.transitionTo(States.HasMoneyState);
    } else {
      // Notify the consumer if the payment method failed.
      if (options.debug) { console.log('Please use an alternative form of payment.'); }
      // Notify the consumer if the payment method failed.
    }
  }

  cancel() {
    /*
      Use Case: The consumer cancels the transaction.
      State: The consumer has not selected an item.
      The machine should:
        - Cancel the transaction.
        - Dispense the change if applicable.
    */
    const { payment, options } = this.machine;
    if (payment.value > 0) {
      // TODO: Implement driver to Dispense cash.
      const refund = payment.cancel();
      if (options.debug) { console.log(`Refunding change of ${refund}`); }
    }
  }
  get name(): string { return 'IdleState'; }
}

export class HasMoneyState implements IState {
  machine: Core;
  constructor(machine: Core) { this.machine = machine; }
  selectById(id: string) {
    /*
      Use Case: The consumer selects an item.
      State: The machine has money (pending)
      1. Consumer selects an item. The machine should:
        - Dispense the item if the amount due is paid in full.
        - Notify the consumer the payment status.
        - Do nothing until the amount is paid in full.
        - Transition to initial state if item is dispensed.
        - Transition to HasSelectedState if multiple selection is enabled.
    */
    const { inventory, payment, selection, options } = this.machine;
    // Notify the consumer if the selected item is sold out.
    // TODO: Observer pattern.
    if (!inventory.isAvailableById(id)) {
      if (options.debug) { console.log(`${inventory.findItemById(id).name} is not available.`); }
    } else {
      // Determine whether multiple selection is enabled.
      if (this.machine.options.selection.type === 'single') {
        if (selection.count > 0) { selection.clear(); }
        // Store the item.
        selection.addItem(inventory.findItemById(id));
      }
    }

    // Dispense the item if the amount due is paid in full.
    if (payment.value >= selection.value) {
      // NOTE: payment.process() will clear the payment value.
      if (payment.process(selection.value)) {
        if (payment.change > 0) {
          // TODO: Implement a driver for cash dispenser.
          if (options.debug) { console.log(`Returning change of ${payment.change}`); }
        }
        // Notify the consumer.
        if (options.debug) { console.log('Enjoy your product! Have a nice day.'); }
        // TODO: Implement a driver for the item dispenser.
        // Update the quantity
        selection.selected
          .map(i => ({ item: i, quantity: selection.getQuantityOfItemById(i.id) }))
          .forEach(i => inventory.updateQuantityById(i.item.id, i.item.quantity - i.quantity));
      } else { if (options.debug) { console.log('Please use an alternative form of payment.'); } }
      this.machine.state.transitionTo(States.IdleState);
      // Clear the selection.
      selection.clear();
    } else {
      if (this.machine.options.selection.type === 'single') {
        selection.clear();
      }
      this.machine.state.transitionTo(States.HasMoneyState);
    }

  }
  pay(amount: number) {
    /*
      Use Case:
      State: The machine has money (limited to cash)
      1. Consumer pays an item. The machine should:
        - Do nothing if the amount is less than total.
        - Notify the consumer if the selected item is out of stock.
    */
    const { payment } = this.machine;
    // Limit additional payments to cash.
    if (payment.isCash()) {
      // Increment the amount paid in cash.
      payment.pay(amount);
    }
  }
  cancel() {
    /*
      Use Case: The consumer cancels the transaction.
      State: The consumer has not selected an item.
      The machine should:
        - Cancel the transaction.
        - Dispense the change if applicable.
    */
    const { payment, state, options } = this.machine;
    if (payment.value > 0) {
      // TODO: Implement driver to Dispense cash.
      const refund = payment.cancel();
      if (options.debug) { console.log(`Refunding change of ${refund}`); }
    }
    state.transitionTo(States.IdleState);
  }
  get name(): string { return 'HasMoneyState'; }
}

export class HasSelectedState implements IState {
  machine: Core;
  constructor(machine: Core) { this.machine = machine; }
  selectById(id: string) {
    /*
      Use Case: The consumer selects one or more items.
      State: The consumer has selected an item but has paid.
      The machine should:
        - Notify the consumer if the selected item is sold out.
        - Store the items.
    */
    const { inventory, selection, options } = this.machine;
    // Notify the consumer if the selected item is sold out.
    // TODO: Observer pattern.
    if (!inventory.isAvailableById(id)) {
      // Notify the consumer the cost and availability of the selected item.
      if (options.debug) { console.log(`${inventory.findItemById(id).name} is not available.`); }
    } else {
      // Store the initial item.
      selection.addItem(inventory.findItemById(id));
    }
  }
  pay(amount: number) {
    /*
      Use Case: The consumer pays for multiple items
      State: The consumer has selected an item.
      The machine should:
        - Validate the payment
        - Transition to HasCashState
        - Notify the consumer if the payment method failed.
    */
    const { payment, options } = this.machine;
    // Validate the payment.
    if (payment.pay(amount)) {
      // Transition to HasCashState.
      this.machine.state.transitionTo(States.HasMoneyState);
    } else {
      // Notify the consumer if the payment method failed.
      if (options.debug) { console.log('Please use an alternative form of payment.'); }
    }
  }
  cancel() {
    const { payment, selection, state, options } = this.machine;
    /*
      Use Case: The consumer cancels the transaction.
      State: The consumer has not selected an item.
      The machine should:
        - Cancel the transaction.
        - Dispense the change if applicable.
    */
    if (payment.value > 0) {
      // TODO: Implement driver to Dispense cash.
      const refund = payment.cancel();
      if (options.debug) { console.log(`Refunding change of ${refund}`); }
    }
    selection.clear();
    state.transitionTo(States.IdleState);
  }
  get name(): string { return 'HasSelectedState'; }
}