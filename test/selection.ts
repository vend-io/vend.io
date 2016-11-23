import Selection from '../src/selection';
import Item from '../src/item';
import { assert } from 'chai';

describe('Selection', () => {
  const selection = new Selection();
  describe('addItem()', () => {
    it('should add an item for selection', () => {
      selection.addItem(new Item('1', 'Fanta Orange', 1.99, 5));
      assert.lengthOf(selection.selected, 1);
      selection
        .addItem(new Item('2', 'Fanta Strawberry', 1.99, 5))
        .addItem(new Item('3', 'Fanta Lemon', 1.99, 5));
      assert.equal(selection.quantity, 15);
      assert.equal(selection.count, 3);
      assert.equal(selection.value, selection.count * 1.99);
    });
  });
  describe('clear()', () => {
    it('should clear all selected items', () => {
      selection.clear();
      assert.lengthOf(selection.selected, 0);
    });
  });
});