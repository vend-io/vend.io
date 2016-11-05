"use strict";
var Vendor = (function () {
    function Vendor() {
        this.imageURL = null;
    }
    Vendor.prototype.toJSON = function () {
        return {
            name: this.name,
            image: { url: this.imageURL }
        };
    };
    return Vendor;
}());
var Item = (function () {
    function Item(id, name, cost, quantity) {
        this.description = null;
        this.imageURL = null;
        this.dataMatrixImageURL = null;
        this.quantity = 0;
        this.vendor = new Vendor();
        this.id = id;
        this.name = name;
        this.cost = cost;
        this.quantity = quantity;
    }
    Item.prototype.toJSON = function () {
        return {
            id: this.id,
            name: this.name,
            vendor: this.vendor.toJSON(),
            image: { url: this.imageURL },
            dataMatrixImage: { url: this.dataMatrixImageURL }
        };
    };
    return Item;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Item;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9pdGVtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFFQTtJQUFBO1FBRUUsYUFBUSxHQUFXLElBQUksQ0FBQztJQVMxQixDQUFDO0lBTkMsdUJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFO1NBQzlCLENBQUM7SUFDSixDQUFDO0lBQ0gsYUFBQztBQUFELENBQUMsQUFYRCxJQVdDO0FBSUQ7SUFVRSxjQUFZLEVBQVUsRUFBRSxJQUFZLEVBQUUsSUFBWSxFQUFFLFFBQWdCO1FBTnBFLGdCQUFXLEdBQVEsSUFBSSxDQUFDO1FBRXhCLGFBQVEsR0FBVyxJQUFJLENBQUM7UUFDeEIsdUJBQWtCLEdBQVcsSUFBSSxDQUFDO1FBQ2xDLGFBQVEsR0FBVyxDQUFDLENBQUM7UUFDckIsV0FBTSxHQUFHLElBQUksTUFBTSxFQUFFLENBQUM7UUFFcEIsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUM7UUFDYixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztJQUMzQixDQUFDO0lBR0QscUJBQU0sR0FBTjtRQUNFLE1BQU0sQ0FBQztZQUNMLEVBQUUsRUFBRSxJQUFJLENBQUMsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsSUFBSTtZQUNmLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUM1QixLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUM3QixlQUFlLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixFQUFFO1NBQ2xELENBQUM7SUFDSixDQUFDO0lBQ0gsV0FBQztBQUFELENBQUMsQUEzQkQsSUEyQkM7QUEzQkQ7c0JBMkJDLENBQUEifQ==