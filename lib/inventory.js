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
    Inventory.prototype.isAvailableById = function (id) { var item = this.findItemById(id); return item && item.quantity > 0; };
    Inventory.prototype.isAvailableByName = function (name) { var item = this.findItemByName(name); return item && item.quantity > 0; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52ZW50b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2ludmVudG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0EsMEJBQTZCLFdBQVcsQ0FBQyxDQUFBO0FBQ3pDLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBRzVCO0lBQUE7UUFFVSxXQUFNLEdBQVcsRUFBRSxDQUFDO1FBQzVCLFlBQU8sR0FBaUIsSUFBSSx3QkFBWSxFQUFFLENBQUM7SUFrRDdDLENBQUM7SUFoREMsMkJBQU8sR0FBUCxVQUFRLElBQVU7UUFDaEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMsTUFBTSxDQUFDLElBQUksQ0FBQztJQUNkLENBQUM7SUFFRCxrQ0FBYyxHQUFkLFVBQWUsRUFBVTtRQUN2QixDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsRUFBWCxDQUFXLENBQUMsQ0FBQztRQUN4QyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsb0NBQWdCLEdBQWhCLFVBQWlCLElBQVk7UUFDM0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLEVBQWYsQ0FBZSxDQUFDLENBQUM7UUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxNQUFNLENB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