"use strict";
var Selection = (function () {
    function Selection() {
        this._selected = [];
    }
    Selection.prototype.addItem = function (item) { this._selected.push(item); return this; };
    Selection.prototype.clear = function () { this._selected = []; };
    Object.defineProperty(Selection.prototype, "selected", {
        get: function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "count", {
        get: function () { return this._selected.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "quantity", {
        get: function () { return this._selected.map(function (i) { return i.quantity; }).reduce(function (a, b) { return a + b; }, 0); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "value", {
        get: function () { return this._selected.map(function (i) { return i.cost; }).reduce(function (a, b) { return a + b; }, 0); },
        enumerable: true,
        configurable: true
    });
    return Selection;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Selection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7SUFBQTtRQUNVLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFTakMsQ0FBQztJQVBDLDJCQUFPLEdBQVAsVUFBUSxJQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMvRCx5QkFBSyxHQUFMLGNBQVUsSUFBSSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRWhDLHNCQUFJLCtCQUFRO2FBQVosY0FBaUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUN6QyxzQkFBSSw0QkFBSzthQUFULGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3JELHNCQUFJLCtCQUFRO2FBQVosY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNqRyxzQkFBSSw0QkFBSzthQUFULGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxJQUFJLEVBQU4sQ0FBTSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDNUYsZ0JBQUM7QUFBRCxDQUFDLEFBVkQsSUFVQztBQVZEOzJCQVVDLENBQUEifQ==