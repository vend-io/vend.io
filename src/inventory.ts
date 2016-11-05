import Item from './item';
import * as _ from 'lodash';
/** Represents an inventory that manages the stored items */
export default class Inventory {
  /** Stores the items and performs operations on it */
  private _items: Item[] = [];
  /** Adds an item to the inventory */
  addItem(item: Item): Inventory { this._items.push(item); return this; }
  /** Removes an item from the inventory */
  removeItem(id: string): Inventory { _.remove(this._items, i => i.id === id); return this; }
  /** Finds an item by id */
  findItemById(id: string): Item { return this._items.filter(i => i.id === id)[0]; }
  /** Finds an item by name */
  findItemByName(name: string): Item { return this._items.filter(i => i.name === name)[0]; }
  /** Determines whether the item is available */
  isAvailableByItem(item: Item): boolean { return item.quantity > 0; }
  /** Determines whether the items are available */
  isAvailableByItems(items: Item[]): boolean { return !(items.map(i => i.quantity > 0).indexOf(false) > -1); }
  /** Determines whether an item is available by id */
  isAvailableById(id: string): boolean { return this.findItemById(id).quantity > 0; }
  /** Determines whether an item is available by name */
  isAvailableByName(name: string): boolean { return this.findItemByName(name).quantity > 0; }
  /** Clears the inventory */
  clear() { this._items = []; }
  /** A list of the items in inventory */
  get list(): Item[] { return this._items; }
}