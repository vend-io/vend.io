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
            var item = inventory.findItemById(id);
            if (options.debug) {
                console.log(item ? item.name + " is not available." : 'Item does not exist.');
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
        var _a = this.machine, payment = _a.payment, options = _a.options;
        if (payment.value > 0) {
            var refund = payment.cancel();
            if (options.debug) {
                console.log("Refunding change of " + refund);
            }
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
            var item = inventory.findItemById(id);
            if (options.debug) {
                console.log(item ? item.name + " is not available." : 'Item does not exist.');
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
                    if (options.debug) {
                        console.log("Returning change of " + payment.change);
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
        var _a = this.machine, payment = _a.payment, state = _a.state, options = _a.options;
        if (payment.value > 0) {
            var refund = payment.cancel();
            if (options.debug) {
                console.log("Refunding change of " + refund);
            }
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
            var item = inventory.findItemById(id);
            if (options.debug) {
                console.log(item ? item.name + " is not available." : 'Item does not exist.');
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
        var _a = this.machine, payment = _a.payment, selection = _a.selection, state = _a.state, options = _a.options;
        if (payment.value > 0) {
            var refund = payment.cancel();
            if (options.debug) {
                console.log("Refunding change of " + refund);
            }
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