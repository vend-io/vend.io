"use strict";
var fbemitter_1 = require('fbemitter');
var Card = (function () {
    function Card(name, cardNumber, expiry) {
        this._amount = 0;
        this._change = 0;
        this._cardNumber = cardNumber;
        this._expiry = expiry;
        this._name = name;
    }
    Card.prototype.pay = function (amount) { this._amount = amount; return true; };
    Card.prototype.process = function (amount) { this._amount = 0; return true; };
    Object.defineProperty(Card.prototype, "amount", {
        get: function () { return this._amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "cardNumber", {
        get: function () { return this._cardNumber; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "expiry", {
        get: function () { return this._expiry; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "name", {
        get: function () { return this._name; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "type", {
        get: function () { return 'card'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "change", {
        get: function () { return this._change; },
        enumerable: true,
        configurable: true
    });
    return Card;
}());
exports.Card = Card;
var Cash = (function () {
    function Cash() {
        this._amount = 0;
        this._change = 0;
    }
    Cash.prototype.pay = function (amount) {
        if (this._amount !== 0) {
            this._amount += amount;
        }
        else {
            this._amount = amount;
        }
        return true;
    };
    Cash.prototype.process = function (amount) { this._change = this._amount - amount; this._amount = 0; return true; };
    Object.defineProperty(Cash.prototype, "amount", {
        get: function () { return this._amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cash.prototype, "type", {
        get: function () { return 'cash'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cash.prototype, "change", {
        get: function () { return this._change; },
        enumerable: true,
        configurable: true
    });
    return Cash;
}());
exports.Cash = Cash;
var Payment = (function () {
    function Payment() {
        this.emitter = new fbemitter_1.EventEmitter();
    }
    Payment.prototype.cancel = function () { this.method.amount = 0; this.emitter.emit('cancel'); };
    ;
    Payment.prototype.isCard = function () { return this.method.type === 'card'; };
    Payment.prototype.isCash = function () { return this.method.type === 'cash'; };
    Payment.prototype.pay = function (amount) {
        var success = false;
        this.emitter.emit('payment', amount, success = this.method.pay(amount));
        return success;
    };
    Payment.prototype.process = function (amount) {
        var success = false;
        this.emitter.emit('process', amount, this.method.change, success = this.method.process(amount));
        return success;
    };
    Payment.prototype.refund = function () {
        var refund = this.method.amount;
        this.method.amount = 0;
        this.emitter.emit('refund', refund);
        return refund;
    };
    Payment.prototype.onPayment = function (listener) { this.emitter.addListener('payment', listener, this); return this; };
    Payment.prototype.onProcess = function (listener) { this.emitter.addListener('process', listener, this); return this; };
    Payment.prototype.onCancel = function (listener) { this.emitter.addListener('cancel', listener, this); return this; };
    Payment.prototype.onRefund = function (listener) { this.emitter.addListener('refund', listener, this); return this; };
    Object.defineProperty(Payment.prototype, "type", {
        get: function () { return this.method.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payment.prototype, "value", {
        get: function () { return this.method.amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payment.prototype, "change", {
        get: function () { return Math.abs(this.method.change); },
        enumerable: true,
        configurable: true
    });
    return Payment;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Payment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBNkIsV0FBVyxDQUFDLENBQUE7QUFpQnpDO0lBV0UsY0FBWSxJQUFZLEVBQUUsVUFBa0IsRUFBRSxNQUFZO1FBVmxELFlBQU8sR0FBVyxDQUFDLENBQUM7UUFJcEIsWUFBTyxHQUFXLENBQUMsQ0FBQztRQU8xQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBS0Qsa0JBQUcsR0FBSCxVQUFJLE1BQWMsSUFBYSxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXBFLHNCQUFPLEdBQVAsVUFBUSxNQUFjLElBQWEsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUduRSxzQkFBSSx3QkFBTTthQUFWLGNBQWUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVyQyxzQkFBSSw0QkFBVTthQUFkLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Msc0JBQUksd0JBQU07YUFBVixjQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckMsc0JBQUksc0JBQUk7YUFBUixjQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFakMsc0JBQUksc0JBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckMsc0JBQUksd0JBQU07YUFBVixjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRS9DLFdBQUM7QUFBRCxDQUFDLEFBckNELElBcUNDO0FBckNZLFlBQUksT0FxQ2hCLENBQUE7QUFHRDtJQUFBO1FBQ1UsWUFBTyxHQUFXLENBQUMsQ0FBQztRQUNwQixZQUFPLEdBQVcsQ0FBQyxDQUFDO0lBa0I5QixDQUFDO0lBYkMsa0JBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxNQUFNLENBQUM7UUFBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxDQUFDO1lBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFBQyxDQUFDO1FBQy9CLE1BQU0sQ0FBQyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRUQsc0JBQU8sR0FBUCxVQUFRLE1BQWMsSUFBYSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUV6RyxzQkFBSSx3QkFBTTthQUFWLGNBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Msc0JBQUksc0JBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckMsc0JBQUksd0JBQU07YUFBVixjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQy9DLFdBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLFlBQUksT0FvQmhCLENBQUE7QUFHRDtJQUFBO1FBR0UsWUFBTyxHQUFpQixJQUFJLHdCQUFZLEVBQUUsQ0FBQztJQTBDN0MsQ0FBQztJQXZDQyx3QkFBTSxHQUFOLGNBQVcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQUVqRSx3QkFBTSxHQUFOLGNBQW9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBRXpELHdCQUFNLEdBQU4sY0FBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFNekQscUJBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDeEUsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBRUQseUJBQU8sR0FBUCxVQUFRLE1BQWM7UUFDcEIsSUFBSSxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3BCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7UUFDaEcsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNqQixDQUFDO0lBQ0Qsd0JBQU0sR0FBTjtRQUNFLElBQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQztRQUN2QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDcEMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0QsMkJBQVMsR0FBVCxVQUFVLFFBQWtCLElBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzVHLDJCQUFTLEdBQVQsVUFBVSxRQUFrQixJQUFhLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUM1RywwQkFBUSxHQUFSLFVBQVMsUUFBa0IsSUFBYSxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDMUcsMEJBQVEsR0FBUixVQUFTLFFBQWtCLElBQWEsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRzFHLHNCQUFJLHlCQUFJO2FBQVIsY0FBcUIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFL0Msc0JBQUksMEJBQUs7YUFBVCxjQUFzQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUVsRCxzQkFBSSwyQkFBTTthQUFWLGNBQXVCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUUvRCxjQUFDO0FBQUQsQ0FBQyxBQTdDRCxJQTZDQztBQTdDRDt5QkE2Q0MsQ0FBQSJ9