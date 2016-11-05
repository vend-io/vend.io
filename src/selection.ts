import Item from './item';
/**
 * Selection
 */
export default class Selection {
  private _selected: Item[] = [];
  // Note: addSelectedItem methods can be restricted to only add a single item!
  addItem(item: Item) { this._selected.push(item); return this; }
  clear() { this._selected = []; }

  get selected() { return this._selected; }
  get count(): number { return this._selected.length; }
  get quantity(): number { return this._selected.map(i => i.quantity).reduce((a, b) => a + b, 0); }
  get value(): number { return this._selected.map(i => i.cost).reduce((a, b) => a + b, 0); }
}