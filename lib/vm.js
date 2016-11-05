"use strict";
var state_1 = require('./state');
var inventory_1 = require('./inventory');
var selection_1 = require('./selection');
var payment_1 = require('./payment');
var FS = require('fs');
var Path = require('path');
var configurationFile = FS.readFileSync(Path.resolve(__dirname, '../') + "/vmconfig.json", 'utf8');
var options = JSON.parse(require('strip-json-comments')(configurationFile));
var VM = (function () {
    function VM() {
        this.options = options;
        this.payment = new payment_1.default();
        this.inventory = new inventory_1.default();
        this.selection = new selection_1.default();
        this.state = new state_1.default(this);
    }
    VM.prototype.selectById = function (id) { this.state.selectById(id); };
    VM.prototype.pay = function (amount) { this.state.pay(amount); };
    VM.prototype.cancel = function () { this.state.cancel(); };
    return VM;
}());
exports.VM = VM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFrQixTQUFTLENBQUMsQ0FBQTtBQUM1QiwwQkFBc0IsYUFBYSxDQUFDLENBQUE7QUFDcEMsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBQ3BDLHdCQUFvQixXQUFXLENBQUMsQ0FBQTtBQUVoQyxJQUFZLEVBQUUsV0FBTSxJQUFJLENBQUMsQ0FBQTtBQUN6QixJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUU3QixJQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLG1CQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JHLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBRTlFO0lBTUU7UUFGQSxZQUFPLEdBQWlCLE9BQU8sQ0FBQztRQUc5QixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztRQUNqQyxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksZUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9CLENBQUM7SUFFRCx1QkFBVSxHQUFWLFVBQVcsRUFBVSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNyRCxnQkFBRyxHQUFILFVBQUksTUFBYyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxtQkFBTSxHQUFOLGNBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFFbkMsU0FBQztBQUFELENBQUMsQUFqQkQsSUFpQkM7QUFqQlksVUFBRSxLQWlCZCxDQUFBIn0=