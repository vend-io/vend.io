"use strict";
var state_1 = require('./state');
var inventory_1 = require('./inventory');
var selection_1 = require('./selection');
var payment_1 = require('./payment');
var options_1 = require('./options');
var Core = (function () {
    function Core(options) {
        this.options = new options_1.default(options);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFDNUIsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBQ3BDLDBCQUFzQixhQUFhLENBQUMsQ0FBQTtBQUNwQyx3QkFBb0IsV0FBVyxDQUFDLENBQUE7QUFDaEMsd0JBQW9CLFdBQVcsQ0FBQyxDQUFBO0FBR2hDO0lBTUUsY0FBWSxPQUFzQjtRQUNoQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNwQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFNRCx5QkFBVSxHQUFWLFVBQVcsRUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUtyRCxrQkFBRyxHQUFILFVBQUksTUFBYyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUvQyxxQkFBTSxHQUFOLGNBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDbkMsV0FBQztBQUFELENBQUMsQUExQkQsSUEwQkM7QUExQlksWUFBSSxPQTBCaEIsQ0FBQSJ9