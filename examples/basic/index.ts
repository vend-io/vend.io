import Core from '../../src/core';
import Item from '../../src/item';
import { Cash } from '../../src/payment';

// Create a vending machine
const machine = new Core(/* { options } */);
// Enable debugging
machine.options.debug = true;
// Set payment method
machine.payment.method = new Cash();
// Add items to inventory
machine.inventory
    .addItem(new Item('1', 'Water', 0.50, 2));

// Enjoy!
machine.selectById('1');
machine.pay(0.50);