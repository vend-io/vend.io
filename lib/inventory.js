"use strict";
var fbemitter_1 = require('fbemitter');
var _ = require('lodash');
var Inventory = (function () {
    function Inventory() {
        this._items = [];
        this.emitter = new fbemitter_1.EventEmitter();
    }
    Inventory.prototype.addItem = function (item) {
        this._items.push(item);
        this.emitter.emit('add', item, this._items);
        return this;
    };
    Inventory.prototype.removeItemById = function (id) {
        _.remove(this._items, function (i) { return i.id === id; });
        this.emitter.emit('remove', this._items);
        return this;
    };
    Inventory.prototype.removeItemByName = function (name) {
        _.remove(this._items, function (i) { return i.name === name; });
        this.emitter.emit('remove', this._items);
        return this;
    };
    Inventory.prototype.findItemById = function (id) { return this._items.filter(function (i) { return i.id === id; })[0]; };
    Inventory.prototype.findItemByName = function (name) { return this._items.filter(function (i) { return i.name === name; })[0]; };
    Inventory.prototype.isAvailableByItem = function (item) { return item.quantity > 0; };
    Inventory.prototype.isAvailableByItems = function (items) { return !(items.map(function (i) { return i.quantity > 0; }).indexOf(false) > -1); };
    Inventory.prototype.isAvailableById = function (id) { return this.findItemById(id).quantity > 0; };
    Inventory.prototype.isAvailableByName = function (name) { return this.findItemByName(name).quantity > 0; };
    Inventory.prototype.updateQuantityById = function (id, quantity) {
        this.findItemById(id).quantity = quantity;
        this.emitter.emit('update', this._items);
        return this;
    };
    Inventory.prototype.updateQuantityByName = function (name, quantity) {
        this.findItemByName(name).quantity = quantity;
        this.emitter.emit('update', this._items);
        return this;
    };
    Inventory.prototype.onAdd = function (listener) { this.emitter.addListener('add', listener, this); return this; };
    Inventory.prototype.onUpdate = function (listener) { this.emitter.addListener('update', listener, this); return this; };
    Inventory.prototype.onRemove = function (listener) { this.emitter.addListener('remove', listener, this); return this; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMEJBQTZCLFdBQVcsQ0FBQyxDQUFBO0FBQ3pDLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRzVCO0lBQUE7UUFFVSxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQzVCLFlBQU8sR0FBaUIsSUFBSSx3QkFBWSxFQUFFLENBQUM7SUFrRDdDLENBQUM7SUFoREMsMkJBQU8sR0FBUCxVQUFRLElBQVU7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsRUFBVTtRQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQWlCLElBQVk7UUFDM0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVELGdDQUFZLEdBQVosVUFBYSxFQUFVLElBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQVgsQ0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRWxGLGtDQUFjLEdBQWQsVUFBZSxJQUFZLElBQVUsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTFGLHFDQUFpQixHQUFqQixVQUFrQixJQUFVLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVwRSxzQ0FBa0IsR0FBbEIsVUFBbUIsS0FBYSxJQUFhLE1BQU0sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFkLENBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUU1RyxtQ0FBZSxHQUFmLFVBQWdCLEVBQVUsSUFBYSxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUVuRixxQ0FBaUIsR0FBakIsVUFBa0IsSUFBWSxJQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRTNGLHNDQUFrQixHQUFsQixVQUFtQixFQUFVLEVBQUUsUUFBZ0I7UUFDN0MsSUFBSSxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO1FBQzFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDekMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCx3Q0FBb0IsR0FBcEIsVUFBcUIsSUFBWSxFQUFFLFFBQWdCO1FBQ2pELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUM5QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QseUJBQUssR0FBTCxVQUFNLFFBQWtCLElBQWUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3RHLDRCQUFRLEdBQVIsVUFBUyxRQUFrQixJQUFlLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1Ryw0QkFBUSxHQUFSLFVBQVMsUUFBa0IsSUFBZSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFNUcseUJBQUssR0FBTCxjQUFVLElBQUksQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUU3QixzQkFBSSw0QkFBSzthQUFULGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDN0MsZ0JBQUM7QUFBRCxDQUFDLEFBckRELElBcURDO0FBckREOzJCQXFEQyxDQUFBIn0=