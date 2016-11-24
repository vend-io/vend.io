"use strict";
var fbemitter_1 = require('fbemitter');
var Card = (function () {
    function Card(name, cardNumber, expiry) {
        this._change = 0;
        this.amount = 0;
        this._cardNumber = cardNumber;
        this._expiry = expiry;
        this._name = name;
    }
    Card.prototype.pay = function (amount) { this.amount = amount; return true; };
    Card.prototype.process = function (amount) { this.amount = 0; return true; };
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
        this._change = 0;
        this.amount = 0;
    }
    Cash.prototype.pay = function (amount) {
        if (this.amount !== 0) {
            this.amount += amount;
        }
        else {
            this.amount = amount;
            this._change = 0;
        }
        return true;
    };
    Cash.prototype.process = function (amount) {
        this._change = this.amount - amount;
        this.amount = 0;
        return true;
    };
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
    Payment.prototype.cancel = function () {
        var refund = this.method.amount;
        this.emitter.emit('cancel', this.method.amount);
        this.method.amount = 0;
        return refund;
    };
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
        this.emitter.emit('process', amount, this.change, success = this.method.process(amount));
        return success;
    };
    Payment.prototype.onCancel = function (listener) { this.emitter.addListener('cancel', listener, this); return this; };
    Payment.prototype.onPayment = function (listener) { this.emitter.addListener('payment', listener, this); return this; };
    Payment.prototype.onProcess = function (listener) { this.emitter.addListener('process', listener, this); return this; };
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
        get: function () { return Math.round(this.method.change * 100) / 100; },
        enumerable: true,
        configurable: true
    });
    return Payment;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Payment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwwQkFBNkIsV0FBVyxDQUFDLENBQUE7QUFpQnpDO0lBWUUsY0FBWSxJQUFZLEVBQUUsVUFBa0IsRUFBRSxNQUFZO1FBUmxELFlBQU8sR0FBVyxDQUFDLENBQUM7UUFFNUIsV0FBTSxHQUFXLENBQUMsQ0FBQztRQU9qQixJQUFJLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztRQUM5QixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztJQUNwQixDQUFDO0lBS0Qsa0JBQUcsR0FBSCxVQUFJLE1BQWMsSUFBYSxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRW5FLHNCQUFPLEdBQVAsVUFBUSxNQUFjLElBQWEsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUlsRSxzQkFBSSw0QkFBVTthQUFkLGNBQW1CLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFN0Msc0JBQUksd0JBQU07YUFBVixjQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckMsc0JBQUksc0JBQUk7YUFBUixjQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFakMsc0JBQUksc0JBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFckMsc0JBQUksd0JBQU07YUFBVixjQUF1QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7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