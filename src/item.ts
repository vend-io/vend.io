/**
 * Vendor
 */
class Vendor {
  // Attributes
  private _name: string;
  private _imgURL: string = null;

  // Setters
  setName(name: string) { this._name = name; return this; }
  setImageURL(url: string) { this._imgURL = url; return this; }

  // Getters
  get name() { return this._name; }
  get imageURL() { return this._imgURL; }

  // Operations
  toJSON() {
    return {
      'name': this.name,
      'image': {
        'url': this.imageURL
      }
    };
  }
}

/**
 * Item
 */
export default class Item {
  // Attributes
  private _id: string;
  private _name: string;
  private _description: { string: any } = null;
  private _cost: number;
  private _imgURL: string = null;
  private _dataMatrixImgURL: string = null;
  private _quantity: number = 0;
  private _vendor = new Vendor();
  constructor(id: string, name: string, cost: number, quantity: number) {
    this._id = id;
    this._name = name;
    this._cost = cost;
    this._quantity = quantity;
  }
  // Setters
  setId(id: string) { this._id = id; return this; }
  setName(name: string) { this._name = name; return this; }
  setDescription(description: { string: any }) { this._description = description; return this; }
  setCost(cost: number) { this._cost = cost; return this; }
  setImageURL(url: string) { this._imgURL = url; return this; }
  setDataMatrixImageURL(url: string) { this._dataMatrixImgURL = url; return this; }
  setQuantity(quantity: number) { this._quantity = quantity; return this; }
  setVendorName(name: string) { this._vendor.setName(name); return this; }
  setVendorImageURL(url: string) { this._vendor.setImageURL(url); return this; }


  // Getters
  get id() { return this._id; }
  get name() { return this._name; }
  get description() { return this._description; }
  get cost() { return this._cost; }
  get imageURL() { return this._imgURL; }
  get dataMatrixImageURL() { return this._dataMatrixImgURL; }
  get quantity() { return this._quantity; }
  get vendor(): Vendor { return this._vendor; }

  // Operations
  toJSON() {
    return {
      'id': this.id,
      'name': this.name,
      'vendor': this.vendor.toJSON(),
      'image': {
        'url': this.imageURL
      },
      'dataMatrixImage': {
        'url': this.dataMatrixImageURL
      }

    };
  }

}