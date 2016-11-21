"use strict";
var event_1 = require('./event');
var _ = require('lodash');
var Inventory = (function () {
    function Inventory() {
        this._items = [];
        this.event = new event_1.default();
    }
    Inventory.prototype.addItem = function (item) { this._items.push(item); return this; };
    Inventory.prototype.removeItemById = function (id) { _.remove(this._items, function (i) { return i.id === id; }); return this; };
    Inventory.prototype.removeItemByName = function (name) { _.remove(this._items, function (i) { return i.name === name; }); return this; };
    Inventory.prototype.findItemById = function (id) { return this._items.filter(function (i) { return i.id === id; })[0]; };
    Inventory.prototype.findItemByName = function (name) { return this._items.filter(function (i) { return i.name === name; })[0]; };
    Inventory.prototype.isAvailableByItem = function (item) { return item.quantity > 0; };
    Inventory.prototype.isAvailableByItems = function (items) { return !(items.map(function (i) { return i.quantity > 0; }).indexOf(false) > -1); };
    Inventory.prototype.isAvailableById = function (id) { return this.findItemById(id).quantity > 0; };
    Inventory.prototype.isAvailableByName = function (name) { return this.findItemByName(name).quantity > 0; };
    Inventory.prototype.updateQuantityById = function (id, quantity) { this.findItemById(id).quantity = quantity; return this; };
    Inventory.prototype.updateQuantityByName = function (name, quantity) { this.findItemByName(name).quantity = quantity; return this; };
    Inventory.prototype.clear = function () { this._items = []; };
    Object.defineProperty(Inventory.prototype, "items", {
        get: function () { return this._items; },
        enumerable: true,
        configurable: true
    });
    return Inventory;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Inventory;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esc0JBQWtCLFNBQVMsQ0FBQyxDQUFBO0FBQzVCLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRTVCO0lBQUE7UUFFVSxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQzVCLFVBQUssR0FBVSxJQUFJLGVBQUssRUFBRSxDQUFDO0lBMkI3QixDQUFDO0lBekJDLDJCQUFPLEdBQVAsVUFBUSxJQUFVLElBQWUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV2RSxrQ0FBYyxHQUFkLFVBQWUsRUFBVSxJQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFL0Ysb0NBQWdCLEdBQWhCLFVBQWlCLElBQVksSUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXZHLGdDQUFZLEdBQVosVUFBYSxFQUFVLElBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxGLGtDQUFjLEdBQWQsVUFBZSxJQUFZLElBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTFGLHFDQUFpQixHQUFqQixVQUFrQixJQUFVLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRSxzQ0FBa0IsR0FBbEIsVUFBbUIsS0FBYSxJQUFhLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RyxtQ0FBZSxHQUFmLFVBQWdCLEVBQVUsSUFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRixxQ0FBaUIsR0FBakIsVUFBa0IsSUFBWSxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNGLHNDQUFrQixHQUFsQixVQUFtQixFQUFVLEVBQUUsUUFBZ0IsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU1Ryx3Q0FBb0IsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLFFBQWdCLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFcEgseUJBQUssR0FBTCxjQUFVLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU3QixzQkFBSSw0QkFBSzthQUFULGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDN0MsZ0JBQUM7QUFBRCxDQUFDLEFBOUJELElBOEJDO0FBOUJEOzJCQThCQyxDQUFBIn0=