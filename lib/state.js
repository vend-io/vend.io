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
                if (selection.count > 0) {
                    selection.clear();
                }
                selection.addItem(inventory.findItemById(id));
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
            if (options.debug) {
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
                if (selection.count > 0) {
                    selection.clear();
                }
                selection.addItem(inventory.findItemById(id));
            }
        }
        if (payment.value >= selection.value) {
            if (payment.process(selection.value)) {
                if (payment.change > 0) {
                    var refund = payment.refund();
                    if (options.debug) {
                        console.log("Refunding change of " + refund);
                    }
                }
                if (options.debug) {
                    console.log('Enjoy your product! Have a nice day.');
                }
                selection.selected
                    .map(function (i) { return ({ item: i, quantity: selection.getQuantityOfItemById(i.id) }); })
                    .forEach(function (i) { return inventory.updateQuantityById(i.item.id, i.item.quantity - i.quantity); });
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
            if (payment.value > 0) {
                var refund = payment.refund();
                if (options.debug) {
                    console.log("Refunding change of " + refund);
                }
            }
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
        var _a = this.machine, payment = _a.payment, state = _a.state;
        if (payment.value > 0) {
            payment.cancel();
        }
        state.transitionTo(States.IdleState);
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
        var _a = this.machine, payment = _a.payment, options = _a.options;
        if (payment.pay(amount)) {
            this.machine.state.transitionTo(States.HasMoneyState);
        }
        else {
            if (options.debug) {
                console.log('Please use an alternative form of payment.');
            }
        }
    };
    HasSelectedState.prototype.cancel = function () {
        var _a = this.machine, payment = _a.payment, selection = _a.selection, state = _a.state;
        if (payment.value > 0) {
            payment.cancel();
        }
        selection.clear();
        state.transitionTo(States.IdleState);
    };
    Object.defineProperty(HasSelectedState.prototype, "name", {
        get: function () { return 'HasSelectedState'; },
        enumerable: true,
        configurable: true
    });
    return HasSelectedState;
}());
exports.HasSelectedState = HasSelectedState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVdBLFdBQVksTUFBTTtJQUNoQiw2Q0FBUyxDQUFBO0lBQ1QscURBQWEsQ0FBQTtJQUNiLDJEQUFnQixDQUFBO0FBQ2xCLENBQUMsRUFKVyxjQUFNLEtBQU4sY0FBTSxRQUlqQjtBQUpELElBQVksTUFBTSxHQUFOLGNBSVgsQ0FBQTtBQUVEO0lBS0UsZUFBWSxPQUFhO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBS0QsNEJBQVksR0FBWixVQUFhLEtBQWE7UUFDeEIsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLEtBQUssTUFBTSxDQUFDLFNBQVM7Z0JBQUUsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUFDLEtBQUssQ0FBQztZQUM5RCxLQUFLLE1BQU0sQ0FBQyxhQUFhO2dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFDdEUsS0FBSyxNQUFNLENBQUMsZ0JBQWdCO2dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDO2dCQUFDLEtBQUssQ0FBQztRQUM5RSxDQUFDO0lBQ0gsQ0FBQztJQUVELDBCQUFVLEdBQVYsVUFBVyxFQUFVLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENB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