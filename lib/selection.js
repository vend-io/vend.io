"use strict";
var Selection = (function () {
    function Selection() {
        this._selected = [];
    }
    Selection.prototype.addItem = function (item) { this._selected.push(item); };
    Selection.prototype.clear = function () { this._selected = []; };
    Object.defineProperty(Selection.prototype, "selected", {
        get: function () { return this._selected; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "length", {
        get: function () { return this._selected.length; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Selection.prototype, "value", {
        get: function () { return this._selected.map(function (item) { return item.cost; }).reduce(function (a, b) { return a + b; }, 0); },
        enumerable: true,
        configurable: true
    });
    return Selection;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Selection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NlbGVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBSUE7SUFBQTtRQUNVLGNBQVMsR0FBVyxFQUFFLENBQUM7SUFRakMsQ0FBQztJQU5DLDJCQUFPLEdBQVAsVUFBUSxJQUFVLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELHlCQUFLLEdBQUwsY0FBVSxJQUFJLENBQUMsU0FBUyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFaEMsc0JBQUksK0JBQVE7YUFBWixjQUFpQixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3pDLHNCQUFJLDZCQUFNO2FBQVYsY0FBZSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUM5QyxzQkFBSSw0QkFBSzthQUFULGNBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxDQUFDLElBQUksRUFBVCxDQUFTLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDLEVBQUUsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxHQUFHLENBQUMsRUFBTCxDQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMxRixnQkFBQztBQUFELENBQUMsQUFURCxJQVNDO0FBVEQ7MkJBU0MsQ0FBQSJ9