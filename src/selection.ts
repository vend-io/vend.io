import Item from './item';
import { EventEmitter } from 'fbemitter';
/**
 * Selection
 */
export default class Selection {
  /** Stores the selected items */
  private _selected: Item[] = [];
  emitter: EventEmitter = new EventEmitter();
  // event: Event = new Event();
  // Note: addItem methods can be restricted to only add a single item!
  /**
   * Adds an item for Selection
   * @param {Item} item The item to select
   */
  addItem(item: Item) {
    this._selected.push(item);
    this.emitter.emit('add', item, this._selected);
    return this;
  }
  /** Returns the quantity of an item by id */
  getQuantityOfItemById(id: string) { return this.selected.filter(i => i.id === id).length; }
  /** Returns the quantity of an item by name */
  getQuantityOfItemByName(name: string) { return this.selected.filter(i => i.name === name).length; }
  onAdd(listener: Function): Selection { this.emitter.addListener('add', listener, this); return this; }
  onUpdate(listener: Function): Selection { this.emitter.addListener('update', listener, this); return this; }
  onRemove(listener: Function): Selection { this.emitter.addListener('remove', listener, this); return this; }
  /** Clears all selected items */
  clear() { this._selected = []; }

  /** The number of items selected */
  get count(): number { return this._selected.length; }
  /** The total quantity of the selected items */
  get quantity(): number { return this._selected.map(i => i.quantity).reduce((a, b) => a + b, 0); }
  /** The selected items */
  get selected() { return this._selected; }
  /** The total value of the selected items */
  get value(): number { return this._selected.map(i => i.cost).reduce((a, b) => a + b, 0); }
}