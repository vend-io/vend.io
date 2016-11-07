"use strict";
var Selection = (function () {
    function Selection() {
        this._selected = [];
    }
    Selection.prototype.addItem = function (item) { this._selected.push(item); return this; };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7SUFBQTtRQUVVLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFrQmpDLENBQUM7SUFaQywyQkFBTyxHQUFQLFVBQVEsSUFBVSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFFL0QseUJBQUssR0FBTCxjQUFVLElBQUksQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztJQUdoQyxzQkFBSSw0QkFBSzthQUFULGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXJELHNCQUFJLCtCQUFRO2FBQVosY0FBeUIsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFFBQVEsRUFBVixDQUFVLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVqRyxzQkFBSSwrQkFBUTthQUFaLGNBQWlCLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFekMsc0JBQUksNEJBQUs7YUFBVCxjQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksT0FBQSxDQUFDLENBQUMsSUFBSSxFQUFOLENBQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxVQUFDLENBQUMsRUFBRSxDQUFDLElBQUssT0FBQSxDQUFDLEdBQUcsQ0FBQyxFQUFMLENBQUssRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzVGLGdCQUFDO0FBQUQsQ0FBQyxBQXBCRCxJQW9CQztBQXBCRDsyQkFvQkMsQ0FBQSJ9