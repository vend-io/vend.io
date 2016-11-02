"use strict";
var Vendor = (function () {
    function Vendor() {
        this._imgURL = null;
    }
    Vendor.prototype.setName = function (name) { this._name = name; return this; };
    Vendor.prototype.setImageURL = function (url) { this._imgURL = url; return this; };
    Object.defineProperty(Vendor.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Vendor.prototype, "imageURL", {
        get: function () { return this._imgURL; },
        enumerable: true,
        configurable: true
    });
    Vendor.prototype.toJSON = function () {
        return {
            'name': this.name,
            'image': {
                'url': this.imageURL
            }
        };
    };
    return Vendor;
}());
var Item = (function () {
    function Item(id, name, cost, quantity) {
        this._description = null;
        this._imgURL = null;
        this._dataMatrixImgURL = null;
        this._quantity = 0;
        this._vendor = new Vendor();
        this._id = id;
        this._name = name;
        this._cost = cost;
        this._quantity = quantity;
    }
    Item.prototype.setId = function (id) { this._id = id; return this; };
    Item.prototype.setName = function (name) { this._name = name; return this; };
    Item.prototype.setDescription = function (description) { this._description = description; return this; };
    Item.prototype.setCost = function (cost) { this._cost = cost; return this; };
    Item.prototype.setImageURL = function (url) { this._imgURL = url; return this; };
    Item.prototype.setDataMatrixImageURL = function (url) { this._dataMatrixImgURL = url; return this; };
    Item.prototype.setQuantity = function (quantity) { this._quantity = quantity; return this; };
    Item.prototype.setVendorName = function (name) { this._vendor.setName(name); return this; };
    Item.prototype.setVendorImageURL = function (url) { this._vendor.setImageURL(url); return this; };
    Object.defineProperty(Item.prototype, "id", {
        get: function () { return this._id; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "description", {
        get: function () { return this._description; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "cost", {
        get: function () { return this._cost; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "imageURL", {
        get: function () { return this._imgURL; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "dataMatrixImageURL", {
        get: function () { return this._dataMatrixImgURL; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "quantity", {
        get: function () { return this._quantity; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "vendor", {
        get: function () { return this._vendor; },
        enumerable: true,
        configurable: true
    });
    Item.prototype.toJSON = function () {
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
    };
    return Item;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Item;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTtJQUFBO1FBR1UsWUFBTyxHQUFXLElBQUksQ0FBQztJQW1CakMsQ0FBQztJQWhCQyx3QkFBTyxHQUFQLFVBQVEsSUFBWSxJQUFJLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDekQsNEJBQVcsR0FBWCxVQUFZLEdBQVcsSUFBSSxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRzdELHNCQUFJLHdCQUFJO2FBQVIsY0FBYSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ2pDLHNCQUFJLDRCQUFRO2FBQVosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUd2Qyx1QkFBTSxHQUFOO1FBQ0UsTUFBTSxDQUFDO1lBQ0wsTUFBTSxFQUFFLElBQUksQ0FBQyxJQUFJO1lBQ2pCLE9BQU8sRUFBRTtnQkFDUCxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVE7YUFDckI7U0FDRixDQUFDO0lBQ0osQ0FBQztJQUNILGFBQUM7QUFBRCxDQUFDLEFBdEJELElBc0JDO0FBS0Q7SUFVRSxjQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLFFBQWdCO1FBTjVELGlCQUFZLEdBQW9CLElBQUksQ0FBQztRQUVyQyxZQUFPLEdBQVcsSUFBSSxDQUFDO1FBQ3ZCLHNCQUFpQixHQUFXLElBQUksQ0FBQztRQUNqQyxjQUFTLEdBQVcsQ0FBQyxDQUFDO1FBQ3RCLFlBQU8sR0FBRyxJQUFJLE1BQU0sRUFBRSxDQUFDO1FBRTdCLElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDO1FBQ2QsSUFBSSxD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