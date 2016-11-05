import { VendorSchema, ItemSchema } from './schema';

class Vendor {
  name: string;
  imageURL: string = null;

  // Operations
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
export default class Item {
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

  // Operations
  toJSON(): ItemSchema {
    return {
      id: this.id,
      name: this.name,
      vendor: this.vendor.toJSON(),
      image: { url: this.imageURL },
      dataMatrixImage: { url: this.dataMatrixImageURL }
    };
  }
}