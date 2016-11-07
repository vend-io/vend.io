"use strict";
var state_1 = require('./state');
var inventory_1 = require('./inventory');
var selection_1 = require('./selection');
var payment_1 = require('./payment');
var FS = require('fs');
var Path = require('path');
var configurationFile = FS.readFileSync(Path.resolve(__dirname, '../') + "/vmconfig.json", 'utf8');
var options = JSON.parse(require('strip-json-comments')(configurationFile));
var Core = (function () {
    function Core() {
        this.options = options;
        this.payment = new payment_1.default();
        this.inventory = new inventory_1.default();
        this.selection = new selection_1.default();
        this.state = new state_1.default(this);
    }
    Core.prototype.selectById = function (id) { this.state.selectById(id); };
    Core.prototype.pay = function (amount) { this.state.pay(amount); };
    Core.prototype.cancel = function () { this.state.cancel(); };
    return Core;
}());
exports.Core = Core;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFDNUIsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBQ3BDLDBCQUFzQixhQUFhLENBQUMsQ0FBQTtBQUNwQyx3QkFBb0IsV0FBVyxDQUFDLENBQUE7QUFFaEMsSUFBWSxFQUFFLFdBQU0sSUFBSSxDQUFDLENBQUE7QUFDekIsSUFBWSxJQUFJLFdBQU0sTUFBTSxDQUFDLENBQUE7QUFFN0IsSUFBTSxpQkFBaUIsR0FBRyxFQUFFLENBQUMsWUFBWSxDQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxtQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztBQUNyRyxJQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQztBQUU5RTtJQU1FO1FBRkEsWUFBTyxHQUFpQixPQUFPLENBQUM7UUFHOUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLGlCQUFPLEVBQUUsQ0FBQztRQUM3QixJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBTUQseUJBQVUsR0FBVixVQUFXLEVBQVUsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFLckQsa0JBQUcsR0FBSCxVQUFJLE1BQWMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFFL0MscUJBQU0sR0FBTixjQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ25DLFdBQUM7QUFBRCxDQUFDLEFBekJELElBeUJDO0FBekJZLFlBQUksT0F5QmhCLENBQUEifQ==