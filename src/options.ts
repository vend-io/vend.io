import { OptionSchema, SelectionSchema, UISchema, PaymentSchema } from './schema';
import * as _ from 'lodash';

export default class Options implements OptionSchema {
  defaults: OptionSchema = {
    debug: false,
    selection: { type: "single" },
    ui: { rows: 1, columns: 2 },
    payment: {
      methods: ["cash"],
      currency: { default: "US", accepted: ["US", "JPY"] }
    }
  };
  /** Enables debugging. */
  debug = false;
  /** Configures the selection options. */
  selection: SelectionSchema = {
    /** Enables single or multiple selection. */
    type: "single"
  };
  /** Configures the ui options */
  ui: UISchema = {
    // Determines whether touch is enabled.
    //"touchEnabled": false, (out of scope)
    /** Configures the number of rows in the display. */
    rows: 1,
    /** Configures the number of rows in the display. */
    columns: 2
  };
  /** Configures the payment options */
  payment: PaymentSchema = {
    /** Configures the accepted methods of payment. */
    methods: [
      "cash"
    ],
    /** Configures the currency options for payment. */
    currency: {
      /** Configures the default currency for payment. */
      default: "us",
      /** Configures the accepted currency(ies) for payment. */
      accepted: [
        "us",
        "jpy"
      ]
    }
  };
  constructor(options?: OptionSchema) {
    if (options) { _.merge(this, _.defaultsDeep(options, this.defaults)); }
  }
}