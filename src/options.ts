import { OptionSchema, SelectionSchema, UISchema, PaymentSchema } from './schema';

export default class Options implements OptionSchema {
  debug = false;
  selection: SelectionSchema = {
    type: "single"
  };
  // Configure the display for items.
  ui: UISchema = {
    // Determines whether touch is enabled.
    //"touchEnabled": false, (out of scope)
    // Configures the number of rows in the display.
    rows: 1,
    // Configures the number of rows in the display.
    columns: 2
  };
  payment: PaymentSchema = {
    // Configures the accepted methods of payment.
    methods: [
      "coin"
      //"cash",
      //"card",
      //"nfc"
    ],
    // Configures the accepted currency for payment.
    currency: {
      default: "US",
      accepted: [
        "US",
        "JPY"
      ]
    }
  };
}