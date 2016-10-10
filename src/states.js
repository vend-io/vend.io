"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FSM = require('state.js');
var State = (function () {
    function State() {
    }
    State.prototype.transition = function (from, to) {
        return this.state(from).to(typeof to === 'string' ? this.state(to) : to);
    };
    State.prototype.state = function (name) {
        return this.states[name];
    };
    return State;
}());
var VMOperationalState = (function (_super) {
    __extends(VMOperationalState, _super);
    function VMOperationalState(model) {
        _super.call(this);
        this.model = model;
        this.states = this.setStates(model);
    }
    VMOperationalState.prototype.setStates = function (model) {
        var start = new FSM.PseudoState('vm-operational-state-start', model, FSM.PseudoStateKind.Initial), operational = new FSM.State('vm-operational-state-operational', model);
        return { start: start, operational: operational };
    };
    return VMOperationalState;
}(State));
exports.VMOperationalState = VMOperationalState;
var VMIdleState = (function (_super) {
    __extends(VMIdleState, _super);
    function VMIdleState(state) {
        _super.call(this);
        this.states = this.setStates(state.states.operational);
    }
    VMIdleState.prototype.setStates = function (state) {
        var start = new FSM.PseudoState('vm-idle-state-start', state, FSM.PseudoStateKind.Initial), idle = new FSM.State('vm-idle-state-idle', state);
        return { start: start, idle: idle };
    };
    return VMIdleState;
}(State));
exports.VMIdleState = VMIdleState;
var VMActiveState = (function (_super) {
    __extends(VMActiveState, _super);
    function VMActiveState(state) {
        _super.call(this);
        this.states = this.setStates(state.states.operational);
    }
    VMActiveState.prototype.setStates = function (state) {
        var active = new FSM.State('vm-active-state-active', state), coinInserted = new FSM.State('vm-active-state-coinInserted', active), itemSelected = new FSM.State('vm-active-state-itemSelected', active);
        return { active: active, coinInserted: coinInserted, itemSelected: itemSelected };
    };
    return VMActiveState;
}(State));
exports.VMActiveState = VMActiveState;
