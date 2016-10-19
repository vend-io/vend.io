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
    State.prototype.transition = function (state, to) {
        if (!to)
            return this.state(this.name).to(state);
        return this.state(state).to(typeof to === 'string' ? this.state(to) : to);
    };
    State.prototype.state = function (name) {
        return this.states[name];
    };
    Object.defineProperty(State.prototype, "name", {
        get: function () { },
        enumerable: true,
        configurable: true
    });
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
        _super.call(this);
        this.states = this.setStates(state.states.operational);
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
        _super.call(this);
        this.states = this.setStates(state.states.operational);
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
        _super.call(this);
        this.states = this.setStates(state.states.operational);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0YXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEdBQUcsV0FBTSxVQUNyQixDQUFDLENBRDhCO0FBaUIvQjtJQUFBO0lBZ0JBLENBQUM7SUFSQywwQkFBVSxHQUFWLFVBQVcsS0FBeUIsRUFBRSxFQUF1QjtRQUMzRCxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBa0IsQ0FBQyxDQUFBO1FBQzVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQTtJQUNyRixDQUFDO0lBQ0QscUJBQUssR0FBTCxVQUFNLElBQVk7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDMUIsQ0FBQztJQUNELHNCQUFhLHVCQUFJO2FBQWpCLGVBQTZCOzs7T0FBQTtJQUMvQixZQUFDO0FBQUQsQ0FBQyxBQWhCRCxJQWdCQztBQUVEO0lBQXdDLHNDQUFLO0lBTTNDLDRCQUFZLEtBQWM7UUFDeEIsaUJBQU8sQ0FBQTtRQUNQLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO1FBQ2xCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtJQUNyQyxDQUFDO0lBQ08sc0NBQVMsR0FBakIsVUFBa0IsS0FBdUI7UUFDdkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsZUFB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