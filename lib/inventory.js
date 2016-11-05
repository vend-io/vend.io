"use strict";
var _ = require('lodash');
var Inventory = (function () {
    function Inventory() {
        this._items = [];
    }
    Inventory.prototype.addItem = function (item) { this._items.push(item); return this; };
    Inventory.prototype.removeItem = function (id) { _.remove(this._items, function (i) { return i.id === id; }); return this; };
    Inventory.prototype.findItemById = function (id) { return this._items.filter(function (i) { return i.id === id; })[0]; };
    Inventory.prototype.findItemByName = function (name) { return this._items.filter(function (i) { return i.name === name; })[0]; };
    Inventory.prototype.isAvailableByItem = function (item) { return item.quantity > 0; };
    Inventory.prototype.isAvailableByItems = function (items) { return !(items.map(function (i) { return i.quantity > 0; }).indexOf(false) > -1); };
    Inventory.prototype.isAvailableById = function (id) { return this.findItemById(id).quantity > 0; };
    Inventory.prototype.isAvailableByName = function (name) { return this.findItemByName(name).quantity > 0; };
    Inventory.prototype.clear = function () { this._items = []; };
    Object.defineProperty(Inventory.prototype, "list", {
        get: function () { return this._items; },
        enumerable: true,
        configurable: true
    });
    return Inventory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Inventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsSUFBWSxDQUFDLFdBQU0sUUFBUSxDQUFDLENBQUE7QUFPNUI7SUFBQTtRQUNVLFdBQU0sR0FBVyxFQUFFLENBQUM7SUFhOUIsQ0FBQztJQVhDLDJCQUFPLEdBQVAsVUFBUSxJQUFVLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1RCw4QkFBVSxHQUFWLFVBQVcsRUFBVSxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDaEYsZ0NBQVksR0FBWixVQUFhLEVBQVUsSUFBVSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEYsa0NBQWMsR0FBZCxVQUFlLElBQVksSUFBVSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUYscUNBQWlCLEdBQWpCLFVBQWtCLElBQVUsSUFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLHNDQUFrQixHQUFsQixVQUFtQixLQUFhLElBQWEsTUFBTSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQWQsQ0FBYyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzVHLG1DQUFlLEdBQWYsVUFBZ0IsRUFBVSxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25GLHFDQUFpQixHQUFqQixVQUFrQixJQUFZLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDM0YseUJBQUssR0FBTCxjQUFVLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU3QixzQkFBSSwyQkFBSTthQUFSLGNBQXFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDNUMsZ0JBQUM7QUFBRCxDQUFDLEFBZEQsSUFjQztBQWREOzJCQWNDLENBQUEifQ==