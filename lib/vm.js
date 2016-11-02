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
        this._initialState = new state_1.InitialState(this);
        this._hasMoneyState = new state_1.HasMoneyState(this);
        this._hasSelectedState = new state_1.HasSelectedState(this);
        this._current = this._initialState;
        this.payment = new payment_1.Payment();
        this.inventory = new inventory_1.default();
        this.selection = new selection_1.default();
    }
    VM.prototype.selectById = function (id) { this._current.selectById(id); };
    VM.prototype.pay = function (amount) { this._current.pay(amount); };
    VM.prototype.cancel = function () { this._current.cancel(); };
    VM.prototype.setPaymentMethod = function (method, details) {
        switch (method) {
            case 'cash':
                this.payment.method = new payment_1.Cash();
                break;
            case 'card':
                this.payment.method = new payment_1.Card(details.name, details.cardNumber, details.expiry);
                break;
        }
    };
    Object.defineProperty(VM.prototype, "state", {
        get: function () { return this._current.name; },
        set: function (state) {
            switch (state.toLowerCase().replace('state', '')) {
                case 'initial':
                    this._current = this._initialState;
                    break;
                case 'hasmoney':
                    this._current = this._hasMoneyState;
                    break;
                case 'hasselected':
                    this._current = this._hasSelectedState;
                    break;
                default: break;
            }
        },
        enumerable: true,
        configurable: true
    });
    return VM;
}());
exports.VM = VM;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHNCQUFxRSxTQUFTLENBQUMsQ0FBQTtBQUMvRSwwQkFBc0IsYUFBYSxDQUFDLENBQUE7QUFDcEMsMEJBQXNCLGFBQWEsQ0FBQyxDQUFBO0FBQ3BDLHdCQUFvQyxXQUFXLENBQUMsQ0FBQTtBQUNoRCxJQUFZLEVBQUUsV0FBTSxJQUFJLENBQUMsQ0FBQTtBQUN6QixJQUFZLElBQUksV0FBTSxNQUFNLENBQUMsQ0FBQTtBQUU3QixJQUFNLGlCQUFpQixHQUFHLEVBQUUsQ0FBQyxZQUFZLENBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLG1CQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO0FBQ3JHLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLHFCQUFxQixDQUFDLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBRTlFO0lBU0U7UUFMQSxZQUFPLEdBQVEsT0FBTyxDQUFDO1FBTXJCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxvQkFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzVDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxxQkFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzlDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksaUJBQU8sRUFBRSxDQUFDO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxtQkFBUyxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLG1CQUFTLEVBQUUsQ0FBQztJQUNuQyxDQUFDO0lBRUQsdUJBQVUsR0FBVixVQUFXLEVBQVUsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDeEQsZ0JBQUcsR0FBSCxVQUFJLE1BQWMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEQsbUJBQU0sR0FBTixjQUFXLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBRXBDLDZCQUFnQixHQUFoQixVQUFpQixNQUFjLEVBQUUsT0FBNEQ7UUFDM0YsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNmLEtBQUssTUFBTTtnQkFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxJQUFJLGNBQUksRUFBRSxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUNyRCxLQUFLLE1BQU07Z0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsSUFBSSxjQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztnQkFBQyxLQUFLLENBQUM7UUFDdkcsQ0FBQztJQUNILENBQUM7SUFFRCxzQkFBSSxxQkFBSzthQVNULGNBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzthQVQxQyxVQUFVLEtBQWE7WUFDckIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNqRCxLQUFLLFNBQVM7b0JBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUFDLEtBQUssQ0FBQztnQkFDMUQsS0FBSyxVQUFVO29CQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQzVELEtBQUssYUFBYTtvQkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztvQkFBQyxLQUFLLENBQUM7Z0JBQ2xFLFNBQVMsS0FBSyxDQUFDO1lBQ2pCLENBQUM7UUFDSCxDQUFDOzs7T0FBQTtJQUlILFNBQUM7QUFBRCxDQUFDLEFBekNELElBeUNDO0FBekNZLFVBQUUsS0F5Q2QsQ0FBQSJ9