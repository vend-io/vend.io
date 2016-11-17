import Inventory from '../src/inventory';
import Item from '../src/item';

import { assert } from 'chai';
describe('Inventory', () => {
  const item = new Item('1', 'Fanta Orange', 1.99, 5);
  const inventory = new Inventory();
  describe('addItem()', () => {
    it('should add an item', () => {
      inventory.addItem(item);
      assert.lengthOf(inventory.items, 1);
    });
  });

  describe('findItemById()', () => {
    it('should find an item by id', () => {
      assert.deepEqual(inventory.findItemById('1'), item);
    });
  });

  describe('findItemByName()', () => {
    it('should find an item by name', () => {
      assert.deepEqual(inventory.findItemByName('Fanta Orange'), item);
    });
  });

  describe('removeItemId()', () => {
    it('should remove an item by id', () => {
      assert.lengthOf(inventory.removeItemById('1').items, 0);
    });
  });

  describe('removeItemName()', () => {
    it('should remove an item by name', () => {
      inventory.addItem(item);
      assert.lengthOf(inventory.removeItemByName('Fanta Orange').items, 0);
    });
  });

  describe('isAvailableById()', () => {
    it('should determine that an item is in stock', () => {
      assert.isTrue(inventory.addItem(item).isAvailableById('1'));
    });

    it('should determine that an item is not stock', () => {
      inventory.findItemById('1').quantity = 0;
      assert.isFalse(inventory.isAvailableById('1'));
    });
  });


  describe('isAvailableByName()', () => {
    it('should determine that an item is in stock', () => {
      inventory.findItemByName('Fanta Orange').quantity = 1;
      assert.isTrue(inventory.isAvailableByName('Fanta Orange'));
    });

    it('should determine that an item is not stock', () => {
      inventory.findItemByName('Fanta Orange').quantity = 0;
      assert.isFalse(inventory.isAvailableByName('Fanta Orange'));
    });
  });

  describe('isAvailableByItems()', () => {
    it('should determine that all of the specified items are in stock', () => {
      const pepsi = new Item('2', 'Pepsi', 2.00, 2);
      inventory.findItemById('1').quantity = 1;
      inventory.addItem(pepsi);
      assert.isTrue(inventory.isAvailableByItems([item, pepsi]));
    });

    it('should determine that at least one of the specified items are not stock', () => {
      const pepsi = new Item('2', 'Pepsi', 2.00, 2);
      inventory.findItemById('1').quantity = 1;
      inventory.addItem(pepsi);
      assert.isTrue(inventory.isAvailableByItems([item, pepsi]));
    });
  });
});