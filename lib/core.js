"use strict";
var state_1 = require('./state');
var inventory_1 = require('./inventory');
var selection_1 = require('./selection');
var payment_1 = require('./payment');
var options_1 = require('./options');
var Core = (function () {
    function Core() {
        this.options = new options_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxzQkFBa0IsU0FBUyxDQUFDLENBQUE7QUFDNUIsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBQ3BDLDBCQUFzQixhQUFhLENBQUMsQ0FBQTtBQUNwQyx3QkFBb0IsV0FBVyxDQUFDLENBQUE7QUFDaEMsd0JBQW9CLFdBQVcsQ0FBQyxDQUFBO0FBRWhDO0lBTUU7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxpQkFBTyxFQUFFLENBQUM7UUFDN0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsU0FBUyxHQUFHLElBQUksbUJBQVMsRUFBRSxDQUFDO1FBQ2pDLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxlQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsQ0FBQztJQU1ELHlCQUFVLEdBQVYsVUFBVyxFQUFVLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBS3JELGtCQUFHLEdBQUgsVUFBSSxNQUFjLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBRS9DLHFCQUFNLEdBQU4sY0FBVyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQztJQUNuQyxXQUFDO0FBQUQsQ0FBQyxBQTFCRCxJQTBCQztBQTFCWSxZQUFJLE9BMEJoQixDQUFBIn0=