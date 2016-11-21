"use strict";
var event_1 = require('./event');
var Selection = (function () {
    function Selection() {
        this._selected = [];
        this.event = new event_1.default();
    }
    Selection.prototype.addItem = function (item) { this._selected.push(item); return this; };
    Selection.prototype.getQuantityOfItemById = function (id) { return this.selected.filter(function (i) { return i.id === id; }).length; };
    Selection.prototype.getQuantityOfItemByName = function (name) { return this.selected.filter(function (i) { return i.name === name; }).length; };
    Selection.prototype.clear = function () { this._selected = []; };
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
    Object.defineProperty(Selection.prototype, "selected", {
        get: function () { return this._selected; },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQ0Esc0JBQWtCLFNBQVMsQ0FBQyxDQUFBO0FBSTVCO0lBQUE7UUFFVSxjQUFTLEdBQVcsRUFBRSxDQUFDO1FBQy9CLFVBQUssR0FBVSxJQUFJLGVBQUssRUFBRSxDQUFDO0lBc0I3QixDQUFDO0lBaEJDLDJCQUFPLEdBQVAsVUFBUSxJQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUUvRCx5Q0FBcUIsR0FBckIsVUFBc0IsRUFBVSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFYLENBQVcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFFM0YsMkNBQXVCLEdBQXZCLFVBQXdCLElBQVksSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxLQUFLLElBQUksRUFBZixDQUFlLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRW5HLHlCQUFLLEdBQUwsY0FBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFHaEMsc0JBQUksNEJBQUs7YUFBVCxjQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVyRCxzQkFBSSwrQkFBUTthQUFaLGNBQXlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxPQUFBLENBQUMsQ0FBQyxRQUFRLEVBQVYsQ0FBVSxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSyxPQUFBLENBQUMsR0FBRyxDQUFDLEVBQUwsQ0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFakcsc0JBQUksK0JBQVE7YUFBWixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXpDLHNCQUFJLDRCQUFLO2FBQVQsY0FBc0IsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLElBQUksRUFBTixDQUFNLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUM1RixnQkFBQztBQUFELENBQUMsQUF6QkQsSUF5QkM7QUF6QkQ7MkJBeUJDLENBQUEifQ==