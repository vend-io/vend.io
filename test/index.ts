import Core from '../src/core';
import Item from '../src/item';
import { Cash } from '../src/payment';
import { assert } from 'chai';


describe('Use Cases', () => {
    let machine: Core = null;
    describe('consumer selects an item', () => {
        (machine = new Core()).inventory.addItem(new Item('1', 'Fanta Orange', 1.99, 5));
        machine.payment.method = new Cash();
        // TODO: It should report item cost through Observer Pattern
        it('should remain in IdleState', () => {
            machine.selectById('1');
            assert.equal(machine.state.name, 'IdleState');
        });
    });
    describe('consumer pays for an item', () => {
        (machine = new Core()).inventory.addItem(new Item('1', 'Fanta Orange', 1.99, 5));
        machine.payment.method = new Cash();
        describe('payment not met', () => {
            it('should transition to HasMoneyState', () => {
                machine.pay(0.50);
                assert.equal(machine.state.name, 'HasMoneyState');
            });
        });
        describe('payment met', () => {
            it('should transition to IdleState', () => {
                machine.pay(1.50);
                assert.equal(machine.state.name, 'HasMoneyState');
                machine.selectById('1');
                assert.equal(machine.state.name, 'IdleState');
            });
            it('should return the change', () => {
                assert.equal(machine.payment.change, 0.01);
            });
            it('should reset the change if consumer pays again', () => {
                machine.pay(1.99);
                assert.equal(machine.payment.change, 0);
                machine.selectById('1');
                assert.equal(machine.payment.change, 0);
            });
            it('should decrement the number of items in stock for the selected item', () => {
                assert.equal(machine.inventory.findItemById('1').quantity, 3);
            });
        });
    });
});