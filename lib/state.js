"use strict";
(function (States) {
    States[States["IdleState"] = 0] = "IdleState";
    States[States["HasMoneyState"] = 1] = "HasMoneyState";
    States[States["HasSelectedState"] = 2] = "HasSelectedState";
})(exports.States || (exports.States = {}));
var States = exports.States;
var State = (function () {
    function State(machine) {
        this._idleState = new IdleState(machine);
        this._hasMoneyState = new HasMoneyState(machine);
        this._hasSelectedState = new HasSelectedState(machine);
        this.transitionTo(States.IdleState);
    }
    State.prototype.transitionTo = function (state) {
        switch (state) {
            case States.IdleState:
                this._current = this._idleState;
                break;
            case States.HasMoneyState:
                this._current = this._hasMoneyState;
                break;
            case States.HasSelectedState:
                this._current = this._hasSelectedState;
                break;
        }
    };
    State.prototype.selectById = function (id) { return this._current.selectById(id); };
    State.prototype.pay = function (amount) { this._current.pay(amount); };
    State.prototype.cancel = function () { this._current.cancel(); };
    Object.defineProperty(State.prototype, "name", {
        get: function () { return this._current.name; },
        enumerable: true,
        configurable: true
    });
    return State;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = State;
var IdleState = (function () {
    function IdleState(machine) {
        this.machine = machine;
    }
    IdleState.prototype.selectById = function (id) {
        var _a = this.machine, inventory = _a.inventory, selection = _a.selection, options = _a.options;
        if (!inventory.isAvailableById(id)) {
            if (options.debug) {
                console.log(inventory.findItemById(id).name + " is not available.");
            }
        }
        else {
            if (this.machine.options.selection.type === 'single') {
                if (options.debug) {
                    console.log("Cost of " + inventory.findItemById(id).name + " is " + inventory.findItemById(id).cost);
                }
            }
            else {
                selection.addItem(inventory.findItemById(id));
                this.machine.state.transitionTo(States.HasSelectedState);
            }
        }
    };
    IdleState.prototype.pay = function (amount) {
        var _a = this.machine, payment = _a.payment, options = _a.options;
        if (payment.pay(amount)) {
            this.machine.state.transitionTo(States.HasMoneyState);
        }
        else {
            if (options) {
                console.log('Please use an alternative form of payment.');
            }
        }
    };
    IdleState.prototype.cancel = function () {
        var payment = this.machine.payment;
        if (payment.value > 0) {
            payment.cancel();
        }
    };
    Object.defineProperty(IdleState.prototype, "name", {
        get: function () { return 'IdleState'; },
        enumerable: true,
        configurable: true
    });
    return IdleState;
}());
exports.IdleState = IdleState;
var HasMoneyState = (function () {
    function HasMoneyState(machine) {
        this.machine = machine;
    }
    HasMoneyState.prototype.selectById = function (id) {
        var _a = this.machine, inventory = _a.inventory, payment = _a.payment, selection = _a.selection, options = _a.options;
        if (!inventory.isAvailableById(id)) {
            if (options.debug) {
                console.log(inventory.findItemById(id).name + " is not available.");
            }
        }
        else {
            if (this.machine.options.selection.type === 'single') {
                selection.addItem(inventory.findItemById(id));
            }
        }
        if (payment.value >= selection.value) {
            if (payment.process(selection.value)) {
                if (payment.change > 0) {
                    if (options.debug) {
                        console.log("Returning change of " + payment.change);
                    }
                }
                if (options.debug) {
                    console.log('Enjoy your product! Have a nice day.');
                }
            }
            else {
                if (options.debug) {
                    console.log('Please use an alternative form of payment.');
                }
            }
            this.machine.state.transitionTo(States.IdleState);
            selection.clear();
        }
        else {
            if (this.machine.options.selection.type === 'single') {
                selection.clear();
            }
            this.machine.state.transitionTo(States.HasMoneyState);
        }
    };
    HasMoneyState.prototype.pay = function (amount) {
        var payment = this.machine.payment;
        if (payment.isCash()) {
            payment.pay(amount);
        }
    };
    HasMoneyState.prototype.cancel = function () {
        var payment = this.machine.payment;
        if (payment.value > 0) {
            payment.cancel();
        }
    };
    Object.defineProperty(HasMoneyState.prototype, "name", {
        get: function () { return 'HasMoneyState'; },
        enumerable: true,
        configurable: true
    });
    return HasMoneyState;
}());
exports.HasMoneyState = HasMoneyState;
var HasSelectedState = (function () {
    function HasSelectedState(machine) {
        this.machine = machine;
    }
    HasSelectedState.prototype.selectById = function (id) {
        var _a = this.machine, inventory = _a.inventory, selection = _a.selection, options = _a.options;
        if (!inventory.isAvailableById(id)) {
            if (options.debug) {
                console.log(inventory.findItemById(id).name + " is not available.");
            }
        }
        else {
            selection.addItem(inventory.findItemById(id));
        }
    };
    HasSelectedState.prototype.pay = function (amount) {
        var payment = this.machine.payment;
        if (payment.pay(amount)) {
            this.machine.state.transitionTo(States.HasMoneyState);
        }
        else {
            console.log('Please use an alternative form of payment.');
        }
    };
    HasSelectedState.prototype.cancel = function () {
        var _a = this.machine, payment = _a.payment, selection = _a.selection;
        if (payment.value > 0) {
            payment.cancel();
        }
        selection.clear();
    };
    Object.defineProperty(HasSelectedState.prototype, "name", {
        get: function () { return 'HasSelectedState'; },
        enumerable: true,
        configurable: true
    });
    return HasSelectedState;
}());
exports.HasSelectedState = HasSelectedState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVdBLFdBQVksTUFBTTtJQUNoQiw2Q0FBUyxDQUFBO0lBQ1QscURBQWEsQ0FBQTtJQUNiLDJEQUFnQixDQUFBO0FBQ2xCLENBQUMsRUFKVyxjQUFNLEtBQU4sY0FBTSxRQUlqQjtBQUpELElBQVksTUFBTSxHQUFOLGNBSVgsQ0FBQTtBQUVEO0lBS0UsZUFBWSxPQUFhO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBS0QsNEJBQVksR0FBWixVQUFhLEtBQWE7UUFDeEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssTUFBTSxDQUFDLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUM5RCxLQUFLLE1BQU0sQ0FBQyxhQUFhO2dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFDdEUsS0FBSyxNQUFNLENBQUMsZ0JBQWdCO2dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUFDLEtBQUssQ0FBQztRQUM5RSxDQUFDO0lBQ0gsQ0FBQztJQUVELDBCQUFVLEdBQVYsVUFBVyxFQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvRCxtQkFBRyxHQUFILFVBQUksTUFBYyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsRCxzQkFBTSxHQUFOLGNBQVcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDcEMsc0JBQUksdUJBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNuRCxZQUFDO0FBQUQsQ0FBQyxBQTNCRCxJQTJCQztBQTNCRDt1QkEyQkMsQ0FBQTtBQUVEO0lBRUUsbUJBQVksT0FBYTtRQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQUMsQ0FBQztJQUN0RCw4QkFBVSxHQUFWLFVBQVcsRUFBVTtRQVNuQixJQUFBLGlCQUFzRCxFQUE5Qyx3QkFBUyxFQUFFLHdCQUFTLEVBQUUsb0JBQU8sQ0FBa0I7UUFFdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSx1QkFBb0IsQ0FBQyxDQUFDO1lBQUMsQ0FBQztRQUM3RixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBR3JELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBTyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQU0sQ0FBQyxDQUFDO2dCQUFDLENBQUM7WUFDekgsQ0FBQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUVOLFNBQVMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUU5QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDM0QsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBQ0QsdUJBQUcsR0FBSCxVQUFJLE1BQWM7UUFTaEIsSUFBQSxpQkFBeUMsRUFBakMsb0JBQU8sRUFBRSxvQkFBTyxDQUFrQjtRQUUxQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUV4QixJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hELENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUVOLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0Q0FBNEMsQ0FBQyxDQUFDO1lBQUMsQ0FBQztRQUM3RSxDQUFDO0lBQ0gsQ0FBQztJQUVELDBCQUFNLEdBQU47UUFRVSxrQ0FBTyxDQUFrQjtRQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBQ0Qsc0JBQUksMkJBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDNUMsZ0JBQUM7QUFBRCxDQUFDLEFBbEVELElBa0VDO0FBbEVZLGlCQUFTLFlBa0VyQixDQUFBO0FBRUQ7SUFFRSx1QkFBWSxPQUFhO1FBQUksSUFBSSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7SUFBQyxDQUFDO0lBQ3RELGtDQUFVLEdBQVYsVUFBVyxFQUFVO1FBV25CLElBQUEsaUJBQStELEVBQXZELHdCQUFTLEVBQUUsb0JBQU8sRUFBRSx3QkFBUyxFQUFFLG9CQUFPLENBQWtCO1FBR2hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksdUJBQW9CLENBQUMsQ0FBQztZQUFDLENBQUM7UUFDN0YsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBRU4sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUVyRCxTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUNoRCxDQUFDO1FBQ0gsQ0FBQztRQUdELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFFckMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBR3ZCLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO3dCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMseUJBQXVCLE9BQU8sQ0FBQyxNQUFRLENBQUMsQ0FBQztvQkFBQyxDQUFDO2dCQUM5RSxDQUFDO2dCQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0NBQXNDLENBQUMsQ0FBQztnQkFBQyxDQUFDO1lBRTdFLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7Z0JBQUMsQ0FBQztZQUFDLENBQUM7WUFDNUYsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUVsRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDcEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO2dCQUNyRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsQ0FBQztJQUVILENBQUM7SUFDRCwyQkFBRyxHQUFILFVBQUksTUFBYztRQVFSLGtDQUFPLENBQWtCO1FBRWpDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFFckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN0QixDQUFDO0lBQ0gsQ0FBQztJQUNELDhCQUFNLEdBQU47UUFRVSxrQ0FBTyxDQUFrQjtRQUNqQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUM7SUFDSCxDQUFDO0lBQ0Qsc0JBQUksK0JBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDaEQsb0JBQUM7QUFBRCxDQUFDLEFBakZELElBaUZDO0FBakZZLHFCQUFhLGdCQWlGekIsQ0FBQTtBQUVEO0lBRUUsMEJBQVksT0FBYTtRQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQUMsQ0FBQztJQUN0RCxxQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQVFuQixJQUFBLGlCQUFzRCxFQUE5Qyx3QkFBUyxFQUFFLHdCQUFTLEVBQUUsb0JBQU8sQ0FBa0I7UUFHdkQsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSx1QkFBb0IsQ0FBQyxDQUFDO1lBQUMsQ0FBQztRQUM3RixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNoRCxDQUFDO0lBQ0gsQ0FBQztJQUNELDhCQUFHLEdBQUgsVUFBSSxNQUFjO1FBU1Isa0NBQU8sQ0FBa0I7UUFFakMsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFeEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUN4RCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixPQUFPLENBQUMsR0FBRyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7UUFDNUQsQ0FBQztJQUNILENBQUM7SUFDRCxpQ0FBTSxHQUFOO1FBQ0UsSUFBQSxpQkFBMkMsRUFBbkMsb0JBQU8sRUFBRSx3QkFBUyxDQUFrQjtRQVE1QyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFdEIsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQ25CLENBQUM7UUFDRCxTQUFTLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDcEIsQ0FBQztJQUNELHNCQUFJLGtDQUFJO2FBQVIsY0FBcUIsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDbkQsdUJBQUM7QUFBRCxDQUFDLEFBeERELElBd0RDO0FBeERZLHdCQUFnQixtQkF3RDVCLENBQUEifQ==