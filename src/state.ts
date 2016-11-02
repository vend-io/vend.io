import { VM } from './vm';

/**
 * VMState
 */
export interface State {
  name: string;
  // TODO: selectItemByName(name: string);
  selectById(id: string);
  pay(amount: number);
  cancel();
}

export class InitialState implements State {
  machine: VM;
  constructor(machine: VM) { this.machine = machine; }
  selectById(id: string) {
    /*
      Use Case: The consumer selects an item.
      State: The consumer has not selected an item or inserted a coin.
      The machine should:
        - Notify the consumer if the selected item is sold out.
        - Notify the consumer the cost of the selected item.
        - Store the initial item and transition to HasSelectedState (if selection type is 'multiple').
    */
    const { inventory, selection } = this.machine;
    // Notify the consumer if the selected item is sold out.
    if (!inventory.isAvailableById(id)) {
      // TODO: Implement the observer pattern.
      console.log(`${inventory.findItemById(id).name} is not available.`);
    } else {
      // Check whether multiple selection is enabled.
      if (this.machine.options.selection.type === 'single') {
        // Notify the consumer the cost of the selected item.
        // TODO: Implement the observer pattern.
        console.log(`Cost of ${inventory.findItemById(id).name} is ${inventory.findItemById(id).cost}`);
      } else {
        // Store the initial item.
        selection.addItem(inventory.findItemById(id));
        // Transition to HasSelectedState.
        this.machine.state = HasSelectedState.name;
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
    const { payment } = this.machine;
    // Validate the payment.
    if (payment.pay(amount)) {
      // Transition to HasCashState.
      this.machine.state = HasMoneyState.name;
    } else {
      // Notify the consumer if the payment method failed.
      console.log('Please use an alternative form of payment.');
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
    const { payment } = this.machine;
    if (payment.value > 0) {
      // TODO: Implement driver to Dispense cash.
      payment.cancel();
    }
  }
  get name(): string { return 'InitialState'; }
  static get name(): string { return 'InitialState'; }
}

export class HasMoneyState implements State {
  machine: VM;
  constructor(machine: VM) { this.machine = machine; }
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
    const { inventory, payment, selection } = this.machine;
    // Notify the consumer if the selected item is sold out.
    // TODO: Observer pattern.
    if (!inventory.isAvailableById(id)) {
      console.log(`${inventory.findItemById(id).name} is not available.`);
    } else {
      // Determine whether multiple selection is enabled.
      if (this.machine.options.selection.type === 'single') {
        // Store the item.
        selection.addItem(inventory.findItemById(id));
      }
    }

    let success: boolean = false;
    const paymentValue: number = payment.value;
    // Dispense the item if the amount due is paid in full.
    if (payment.value >= selection.value) {
      // NOTE: payment.process() will clear the payment value.
      success = payment.process();
      if (success) {
        if (payment.value > selection.value) {
          // TODO: Implement a driver for cash dispenser.
          console.log(`Returning change of ${paymentValue}`);
        }
        // Notify the consumer.
        console.log('Enjoy your product! Have a nice day.');
        // TODO: Implement a driver for the item dispenser.
      } else { console.log('Please use an alternative form of payment.'); }
      this.machine.state = InitialState.name;
      // Clear the selection.
      selection.clear();
    } else {
      if (this.machine.options.selection.type === 'single') {
        selection.clear();
      }
      this.machine.state = HasMoneyState.name;
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
    const { payment } = this.machine;
    if (payment.value > 0) {
      // TODO: Implement driver to Dispense cash.
      payment.cancel();
    }
  }
  get name(): string { return 'HasMoneyState'; }
  static get name(): string { return 'HasMoneyState'; }
}

export class HasSelectedState implements State {
  machine: VM;
  constructor(machine: VM) { this.machine = machine; }
  selectById(id: string) {
    /*
      Use Case: The consumer selects one or more items.
      State: The consumer has selected an item but has paid.
      The machine should:
        - Notify the consumer if the selected item is sold out.
        - Store the items.
    */
    const { inventory, selection } = this.machine;
    // Notify the consumer if the selected item is sold out.
    // TODO: Observer pattern.
    if (!inventory.isAvailableById(id)) {
      console.log(`${inventory.findItemById(id).name} is not available.`);
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
    const { payment } = this.machine;
    // Validate the payment.
    if (payment.pay(amount)) {
      // Transition to HasCashState.
      this.machine.state = HasMoneyState.name;
    } else {
      // Notify the consumer if the payment method failed.
      console.log('Please use an alternative form of payment.');
    }
  }
  cancel() {
    const { payment, selection } = this.machine;
    /*
      Use Case: The consumer cancels the transaction.
      State: The consumer has not selected an item.
      The machine should:
        - Cancel the transaction.
        - Dispense the change if applicable.
    */
    if (payment.value > 0) {
      // TODO: Implement driver to Dispense cash.
      payment.cancel();
    }
    selection.clear();
  }
  get name(): string { return 'HasSelectedState'; }
  static get name(): string { return 'HasSelectedState'; }
}