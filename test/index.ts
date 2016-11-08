import { Core } from '../src/core';
// import { States } from '../src/state';
import Item from '../src/item';
import { assert } from 'chai';

describe('Use Cases', () => {
  const machine = new Core();
  machine.inventory
    .addItem(new Item('1', 'Fanta Orange', 1.99, 5));
  describe('customer selects an item', () => {
    // TODO: It should report item cost through Observer Pattern
    it('should remain in idle state', () => {
      machine.selectById('1');
      assert.equal(machine.state.name, 'IdleState');
    });
  });
});