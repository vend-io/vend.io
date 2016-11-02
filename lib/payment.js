"use strict";
var Card = (function () {
    function Card(name, cardNumber, expiry) {
        this._amount = 0;
        this._name = name;
        this._cardNumber = cardNumber;
        this._expiry = expiry;
    }
    Card.prototype.pay = function (amount) { this._amount = amount; return true; };
    Card.prototype.process = function () { this._amount = 0; return true; };
    Object.defineProperty(Card.prototype, "type", {
        get: function () { return 'card'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "amount", {
        get: function () { return this._amount; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "name", {
        get: function () { return this._name; },
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
    return Card;
}());
exports.Card = Card;
var Cash = (function () {
    function Cash() {
        this._amount = 0;
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
    Cash.prototype.process = function () { this._amount = 0; return true; };
    Object.defineProperty(Cash.prototype, "type", {
        get: function () { return 'cash'; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Cash.prototype, "amount", {
        get: function () { return this._amount; },
        enumerable: true,
        configurable: true
    });
    return Cash;
}());
exports.Cash = Cash;
var Payment = (function () {
    function Payment() {
    }
    Payment.prototype.pay = function (amount) { return this._method.pay(amount); };
    Payment.prototype.isCash = function () { return this._method.type === 'cash'; };
    Payment.prototype.isCard = function () { return this._method.type === 'card'; };
    Payment.prototype.isNFC = function () { return this._method.type === 'nfc'; };
    Payment.prototype.cancel = function () { this._method.amount = 0; };
    ;
    Payment.prototype.process = function () { return this._method.process(); };
    Object.defineProperty(Payment.prototype, "method", {
        get: function () { return this._method; },
        set: function (method) { this._method = method; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payment.prototype, "type", {
        get: function () { return this._method.type; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Payment.prototype, "value", {
        get: function () { return this._method.amount; },
        enumerable: true,
        configurable: true
    });
    return Payment;
}());
exports.Payment = Payment;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wYXltZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFPQTtJQU1FLGNBQVksSUFBWSxFQUFFLFVBQWtCLEVBQUUsTUFBWTtRQUZsRCxZQUFPLEdBQVcsQ0FBQyxDQUFDO1FBRzFCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1FBQzlCLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO0lBQ3hCLENBQUM7SUFFRCxrQkFBRyxHQUFILFVBQUksTUFBYyxJQUFhLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDcEUsc0JBQU8sR0FBUCxjQUFZLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDNUMsc0JBQUksc0JBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckMsc0JBQUksd0JBQU07YUFBVixjQUFlLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckMsc0JBQUksc0JBQUk7YUFBUixjQUFhLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDakMsc0JBQUksNEJBQVU7YUFBZCxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQzdDLHNCQUFJLHdCQUFNO2FBQVYsY0FBZSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBRXZDLFdBQUM7QUFBRCxDQUFDLEFBcEJELElBb0JDO0FBcEJZLFlBQUksT0FvQmhCLENBQUE7QUFFRDtJQUFBO1FBQ1UsWUFBTyxHQUFXLENBQUMsQ0FBQztJQVc5QixDQUFDO0lBVkMsa0JBQUcsR0FBSCxVQUFJLE1BQWM7UUFDaEIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDO1FBQ3pCLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQUMsQ0FBQztRQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELHNCQUFPLEdBQVAsY0FBWSxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTVDLHNCQUFJLHNCQUFJO2FBQVIsY0FBcUIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3JDLHNCQUFJLHdCQUFNO2FBQVYsY0FBdUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUMvQyxXQUFDO0FBQUQsQ0FBQyxBQVpELElBWUM7QUFaWSxZQUFJLE9BWWhCLENBQUE7QUFFRDtJQUFBO0lBWUEsQ0FBQztJQVZDLHFCQUFHLEdBQUgsVUFBSSxNQUFjLElBQWEsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNqRSx3QkFBTSxHQUFOLGNBQW9CLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO0lBQzFELHdCQUFNLEdBQU4sY0FBb0IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7SUFDMUQsdUJBQUssR0FBTCxjQUFtQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztJQUN4RCx3QkFBTSxHQUFOLGNBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7SUFDckMseUJBQU8sR0FBUCxjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDckQsc0JBQUksMkJBQU07YUFDVixjQUE4QixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7YUFEcEQsVUFBVyxNQUFxQixJQUFJLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFFNUQsc0JBQUkseUJBQUk7YUFBUixjQUFxQixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQUNoRCxzQkFBSSwwQkFBSzthQUFULGNBQXNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBQ3JELGNBQUM7QUFBRCxDQUFDLEFBWkQsSUFZQztBQVpZLGVBQU8sVUFZbkIsQ0FBQSJ9