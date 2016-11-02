import Item from './item';
/**
 * Selection
 */
export default class Selection {
  private _selected: Item[] = [];
  // Note: addSelectedItem methods can be restricted to only add a single item!
  addItem(item: Item) { this._selected.push(item); }
  clear() { this._selected = []; }

  get selected() { return this._selected; }
  get length() { return this._selected.length; }
  get value() { return this._selected.map(item => item.cost).reduce((a, b) => a + b, 0); }
}