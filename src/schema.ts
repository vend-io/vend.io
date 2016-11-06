export interface IJSON {
  toJSON(): Schema;
}

export interface Schema { }

export interface OptionSchema extends Schema {
  selection: SelectionSchema;
  ui: UISchema;
  payment: PaymentSchema;
}

export interface SelectionSchema extends Schema {
  /** The type of selection to use */
  type: 'single' | 'multiple';
}

export interface UISchema extends Schema {
  rows: number;
  columns: number;
}

export interface PaymentSchema extends Schema {
  methods: string[];
  currency: { default: string, accepted: string[] };
}

export interface ItemSchema extends Schema {
  /** The identifier of the item */
  id: string;
  /** The name of the item */
  name: string;
  /** The cost of the item  */
  cost: number;
  /** The quantity of the item */
  quantity: number;
  /** The properties of the vendor */
  vendor: VendorSchema;
  /** The image of the item */
  image?: { url: string };
  /** The data matrix image of the item */
  dataMatrixImage?: { url: string };
}

export interface VendorSchema extends Schema {
  /** The name of the vendor */
  name: string;
  /** The image of the item */
  image: { url: string };
}