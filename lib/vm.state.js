"use strict";
var InitialState = (function () {
    function InitialState(machine) {
        this.machine = machine;
    }
    InitialState.prototype.selectById = function (id) {
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
                this.machine.state = HasSelectedState.name;
            }
        }
    };
    InitialState.prototype.pay = function (amount) {
        var payment = this.machine.payment;
        if (payment.pay(amount)) {
            this.machine.state = HasMoneyState.name;
        }
        else {
            console.log('Please use an alternative form of payment.');
        }
    };
    InitialState.prototype.cancel = function () {
        var payment = this.machine.payment;
        if (payment.value > 0) {
            payment.cancel();
        }
    };
    Object.defineProperty(InitialState.prototype, "name", {
        get: function () { return 'InitialState'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(InitialState, "name", {
        get: function () { return 'InitialState'; },
        enumerable: true,
        configurable: true
    });
    return InitialState;
}());
exports.InitialState = InitialState;
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
        var selectionValue = selection.value;
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
            this.machine.state = InitialState.name;
            selection.clear();
        }
        else {
            if (this.machine.options.selection.type === 'single') {
                selection.clear();
            }
            this.machine.state = HasMoneyState.name;
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
    Object.defineProperty(HasMoneyState, "name", {
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
            this.machine.state = HasMoneyState.name;
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
    Object.defineProperty(HasSelectedState, "name", {
        get: function () { return 'HasSelectedState'; },
        enumerable: true,
        configurable: true
    });
    return HasSelectedState;
}());
exports.HasSelectedState = HasSelectedState;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uc3RhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdm0uc3RhdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQWFBO0lBRUUsc0JBQVksT0FBVztRQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0lBQUMsQ0FBQztJQUNwRCxpQ0FBVSxHQUFWLFVBQVcsRUFBVTtRQVNuQixJQUFBLGlCQUE2QyxFQUFyQyx3QkFBUyxFQUFFLHdCQUFTLENBQWtCO1FBRTlDLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFFbkMsT0FBTyxDQUFDLEdBQUcsQ0FBSSxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksdUJBQW9CLENBQUMsQ0FBQztRQUN0RSxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFFTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7Z0JBR3JELE9BQU8sQ0FBQyxHQUFHLENBQUMsYUFBVyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksWUFBTyxTQUFTLENBQUMsWUFBWSxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQU0sQ0FBQyxDQUFDO1lBQ2xHLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFFTixTQUFTLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFFOUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLEdBQUcsZ0JBQWdCLENBQUMsSUFBSSxDQUFDO1lBQzdDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztJQUNELDBCQUFHLEdBQUgsVUFBSSxNQUFjO1FBU1Isa0NBQU8sQ0FBa0I7UUFFakMsRUFBRSxDQUFDLENBQUMs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