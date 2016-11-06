import { VendorSchema, ItemSchema, IJSON } from './schema';

class Vendor implements IJSON {
  name: string;
  imageURL: string = null;
  /** Represents a vendor as JSON */
  toJSON(): VendorSchema {
    return {
      name: this.name,
      image: { url: this.imageURL }
    };
  }
}
/**
 * Item
 */
export default class Item implements IJSON {
  // Attributes
  id: string;
  name: string;
  description: any = null;
  cost: number;
  imageURL: string = null;
  dataMatrixImageURL: string = null;
  quantity: number = 0;
  vendor = new Vendor();
  constructor(id: string, name: string, cost: number, quantity: number) {
    this.id = id;
    this.name = name;
    this.cost = cost;
    this.quantity = quantity;
  }
  /** Represents an item as JSON */
  toJSON(): ItemSchema {
    return {
      id: this.id,
      name: this.name,
      cost: this.cost,
      quantity: this.quantity,
      vendor: this.vendor.toJSON(),
      image: { url: this.imageURL },
      dataMatrixImage: { url: this.dataMatrixImageURL }
    };
  }
}