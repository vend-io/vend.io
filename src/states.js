"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FSM = require("state.js");
var State = (function () {
    function State() {
    }
    State.prototype.transition = function (state, to) {
        if (!to)
            return this.state(this.name).to(state);
        return this.state(state).to(typeof to === 'string' ? this.state(to) : to);
    };
    State.prototype.state = function (name) {
        return this.states[name];
    };
    return State;
}());
var VMOperationalState = (function (_super) {
    __extends(VMOperationalState, _super);
    function VMOperationalState(model) {
        var _this = _super.call(this) || this;
        _this.model = model;
        _this.states = _this.setStates(model);
        return _this;
    }
    VMOperationalState.prototype.setStates = function (model) {
        var start = new FSM.PseudoState('[operational].(start)', model, FSM.PseudoStateKind.Initial), operational = new FSM.State('[operational]', model);
        return { start: start, operational: operational };
    };
    Object.defineProperty(VMOperationalState.prototype, "name", {
        get: function () {
            return 'operational';
        },
        enumerable: true,
        configurable: true
    });
    VMOperationalState.prototype.state = function (name) {
        if (name === void 0) { name = this.name; }
        return _super.prototype.state.call(this, name);
    };
    return VMOperationalState;
}(State));
exports.VMOperationalState = VMOperationalState;
var VMIdleState = (function (_super) {
    __extends(VMIdleState, _super);
    function VMIdleState(state) {
        var _this = _super.call(this) || this;
        _this.states = _this.setStates(state.states.operational);
        return _this;
    }
    VMIdleState.prototype.setStates = function (state) {
        var start = new FSM.PseudoState('[idle].(start)', state, FSM.PseudoStateKind.Initial), idle = new FSM.State('[idle]', state);
        return { start: start, idle: idle };
    };
    Object.defineProperty(VMIdleState.prototype, "name", {
        get: function () {
            return 'idle';
        },
        enumerable: true,
        configurable: true
    });
    VMIdleState.prototype.state = function (name) {
        if (name === void 0) { name = this.name; }
        return _super.prototype.state.call(this, name);
    };
    return VMIdleState;
}(State));
exports.VMIdleState = VMIdleState;
var VMActiveState = (function (_super) {
    __extends(VMActiveState, _super);
    function VMActiveState(state) {
        var _this = _super.call(this) || this;
        _this.states = _this.setStates(state.states.operational);
        return _this;
    }
    VMActiveState.prototype.setStates = function (state) {
        var active = new FSM.State('[active]', state), coinInserted = new FSM.State('(coinInserted)', active), itemSelected = new FSM.State('(itemSelected)', active);
        return { active: active, coinInserted: coinInserted, itemSelected: itemSelected };
    };
    Object.defineProperty(VMActiveState.prototype, "name", {
        get: function () {
            return 'active';
        },
        enumerable: true,
        configurable: true
    });
    VMActiveState.prototype.state = function (name) {
        if (name === void 0) { name = this.name; }
        return _super.prototype.state.call(this, name);
    };
    return VMActiveState;
}(State));
exports.VMActiveState = VMActiveState;
var VMServiceState = (function (_super) {
    __extends(VMServiceState, _super);
    function VMServiceState(state) {
        var _this = _super.call(this) || this;
        _this.states = _this.setStates(state.states.operational);
        return _this;
    }
    VMServiceState.prototype.setStates = function (state) {
        var service = new FSM.State('(service)', state);
        return { service: service };
    };
    Object.defineProperty(VMServiceState.prototype, "name", {
        get: function () {
            return 'service';
        },
        enumerable: true,
        configurable: true
    });
    VMServiceState.prototype.state = function (name) {
        if (name === void 0) { name = this.name; }
        return _super.prototype.state.call(this, name);
    };
    return VMServiceState;
}(State));
exports.VMServiceState = VMServiceState;
