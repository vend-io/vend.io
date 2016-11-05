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
        this._current = this._idleState;
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
            default: break;
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
        var _a = this.machine, inventory = _a.inventory, selection = _a.selection;
        if (!inventory.isAvailableById(id)) {
            console.log(inventory.findItemById(id).name + " is not available.");
        }
        else {
            if (this.machine.options.selection.type === 'single') {
                console.log("Cost of " + inventory.findItemById(id).name + " is " + inventory.findItemById(id).cost);
            }
            else {
                selection.addItem(inventory.findItemById(id));
                this.machine.state.transitionTo(States.HasSelectedState);
            }
        }
    };
    IdleState.prototype.pay = function (amount) {
        var payment = this.machine.payment;
        if (payment.pay(amount)) {
            this.machine.state.transitionTo(States.HasMoneyState);
        }
        else {
            console.log('Please use an alternative form of payment.');
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
        var _a = this.machine, inventory = _a.inventory, payment = _a.payment, selection = _a.selection;
        if (!inventory.isAvailableById(id)) {
            console.log(inventory.findItemById(id).name + " is not available.");
        }
        else {
            if (this.machine.options.selection.type === 'single') {
                selection.addItem(inventory.findItemById(id));
            }
        }
        var success = false;
        var paymentValue = payment.value;
        if (payment.value >= selection.value) {
            success = payment.process();
            if (success) {
                if (payment.value > selection.value) {
                    console.log("Returning change of " + paymentValue);
                }
                console.log('Enjoy your product! Have a nice day.');
            }
            else {
                console.log('Please use an alternative form of payment.');
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
        var _a = this.machine, inventory = _a.inventory, selection = _a.selection;
        if (!inventory.isAvailableById(id)) {
            console.log(inventory.findItemById(id).name + " is not available.");
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQVVBLFdBQVksTUFBTTtJQUNoQiw2Q0FBUyxDQUFBO0lBQ1QscURBQWEsQ0FBQTtJQUNiLDJEQUFnQixDQUFBO0FBQ2xCLENBQUMsRUFKVyxjQUFNLEtBQU4sY0FBTSxRQUlqQjtBQUpELElBQVksTUFBTSxHQUFOLGNBSVgsQ0FBQTtBQUVEO0lBS0UsZUFBWSxPQUFXO1FBQ3JCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsSUFBSSxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUN2RCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUM7SUFDbEMsQ0FBQztJQUNELDRCQUFZLEdBQVosVUFBYSxLQUFhO1FBQ3hCLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDZCxLQUFLLE1BQU0sQ0FBQyxTQUFTO2dCQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFDOUQsS0FBSyxNQUFNLENBQUMsYUFBYTtnQkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUM7Z0JBQUMsS0FBSyxDQUFDO1lBQ3RFLEtBQUssTUFBTSxDQUFDLGdCQUFnQjtnQkFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztnQkFBQyxLQUFLLENBQUM7WUFDNUUsU0FBUyxLQUFLLENBQUM7UUFDakIsQ0FBQztJQUNILENBQUM7SUFFRCwwQkFBVSxHQUFWLFVBQVcsRUFBVSxJQUFJLE1BQU0sQ0FBQyxJ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