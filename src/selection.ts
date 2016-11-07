import Item from './item';
/**
 * Selection
 */
export default class Selection {
  /** Stores the selected items */
  private _selected: Item[] = [];
  // Note: addItem methods can be restricted to only add a single item!
  /**
   * Adds an item for Selection
   * @param {Item} item The item to select
   */
  addItem(item: Item) { this._selected.push(item); return this; }
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