/** An JSON interface for classes */
export interface IJSON {
  toJSON(): Schema;
}
/** A base JSON schema */
export interface Schema { }

/** A JSON schema for Option */
export interface OptionSchema extends Schema {
  debug: boolean;
  selection: SelectionSchema;
  ui: UISchema;
  payment: PaymentSchema;
}

/** A JSON schema for Option.Selection */
export interface SelectionSchema extends Schema {
  /** The type of selection to use */
  type: 'single' | 'multiple';
}

/** A JSON schema for Option.UI */
export interface UISchema extends Schema {
  rows: number;
  columns: number;
}

/** A JSON schema for Option.Payment */
export interface PaymentSchema extends Schema {
  methods: string[];
  currency: { default: string, accepted: string[] };
}

/** A JSON schema for Item */
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

/** A JSON schema for Vendor */
export interface VendorSchema extends Schema {
  /** The name of the vendor */
  name: string;
  /** The image of the item */
  image: { url: string };
}