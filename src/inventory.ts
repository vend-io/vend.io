import Item from './item';
import * as _ from 'lodash';

/**
 * Inventory
 * 
 * Inventory manages the state of the items.
 */
export default class Inventory {
  private _items: Item[] = [];
  // Operations
  addItem(item: Item) { this._items.push(item); return this; }
  removeItem(id: string) { _.remove(this._items, i => i.id === id); return this; }
  findItemById(id: string): Item { return this._items.filter(i => i.id === id)[0]; }
  findItemByName(name: string): Item { return this._items.filter(i => i.name === name)[0]; }
  isAvailableByItem(item: Item): boolean { return item.quantity > 0; }
  isAvailableByItems(items: Item[]): boolean { return !(items.map(i => i.quantity > 0).indexOf(false) > -1); }
  isAvailableById(id: string): boolean { return this.findItemById(id).quantity > 0; }
  isAvailableByName(name: string): boolean { return this.findItemByName(name).quantity > 0; }
  clear() { this._items = []; }

  get list(): Item[] { return this._items; }
}