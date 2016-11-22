import Item from './item';
import { EventEmitter } from 'fbemitter';
import * as _ from 'lodash';
// import { Subject } from 'rxjs';
/** Represents an inventory that manages the stored items */
export default class Inventory {
  /** Stores the items and performs operations on it */
  private _items: Item[] = [];
  emitter: EventEmitter = new EventEmitter();
  /** Adds an item to the inventory */
  addItem(item: Item): Inventory {
    this._items.push(item);
    this.emitter.emit('add', item, this._items);
    return this;
  }
  /** Removes an item from the inventory by id */
  removeItemById(id: string): Inventory {
    _.remove(this._items, i => i.id === id);
    this.emitter.emit('remove', this._items);
    return this;
  }
  /** Removes an item from the inventory by name */
  removeItemByName(name: string): Inventory {
    _.remove(this._items, i => i.name === name);
    this.emitter.emit('remove', this._items);
    return this;
  }
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
  /** Updates the item quantity by id */
  updateQuantityById(id: string, quantity: number) {
    this.findItemById(id).quantity = quantity;
    this.emitter.emit('update', this._items);
    return this;
  }
  /** Updates the item quantity by name */
  updateQuantityByName(name: string, quantity: number) {
    this.findItemByName(name).quantity = quantity;
    this.emitter.emit('update', this._items);
    return this;
  }
  onAdd(listener: Function): Inventory { this.emitter.addListener('add', listener, this); return this; }
  onUpdate(listener: Function): Inventory { this.emitter.addListener('update', listener, this); return this; }
  onRemove(listener: Function): Inventory { this.emitter.addListener('remove', listener, this); return this; }
  /** Clears the inventory */
  clear() { this._items = []; }
  /** A list of the items in inventory */
  get items(): Item[] { return this._items; }
}