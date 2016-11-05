export interface VendorSchema {
  /** The name of the vendor */
  name: string;
  /** The image of the item */
  image: { url: string };
}

export interface ItemSchema {
  /** The identifier of the item */
  id: string;
  /** The name of the item */
  name: string;
  /** The properties of the vendor */
  vendor: VendorSchema;
  /** The image of the item */
  image?: { url: string };
  /** The data matrix image of the item */
  dataMatrixImage?: { url: string };
}

export interface SelectionSchema {
  /** The type of selection to use */
  type: 'single' | 'multiple';
}

export interface UISchema {
  rows: number;
  columns: number;
}

export interface PaymentSchema {
  methods: string[];
  currency: { default: string, accepted: string[] };
}

export interface OptionSchema {
  selection: SelectionSchema;
  ui: UISchema;
  payment: PaymentSchema;
}