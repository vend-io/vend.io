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
        if (!to) {
            return this.state(this.name).to(state);
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhdGVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3N0YXRlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxJQUFZLEdBQUcsV0FBTSxVQUFVLENBQUMsQ0FBQTtBQWlCaEM7SUFBQTtJQWtCQSxDQUFDO0lBVkMsMEJBQVUsR0FBVixVQUFXLEtBQXlCLEVBQUUsRUFBdUI7UUFDM0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ1IsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFrQixDQUFDLENBQUM7UUFDdEQsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQWUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUN0RixDQUFDO0lBQ0QscUJBQUssR0FBTCxVQUFNLElBQVk7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNELHNCQUFhLHVCQUFJO2FBQWpCLGVBQTRCOzs7T0FBQTtJQUM5QixZQUFDO0FBQUQsQ0FBQyxBQWxCRCxJQWtCQztBQUVEO0lBQXdDLHNDQUFLO0lBTTNDLDRCQUFZLEtBQWM7UUFDeEIsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBQ08sc0NBQVMsR0FBakIsVUFBa0IsS0FBdUI7UUFDdkMsSUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLHVCQUF1QixFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUM1RixXQUFXLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN0RCxNQUFNLENBQUMsRUFBRSxZQUFLLEVBQUUsd0JBQVcsRUFBRSxDQUFDO0lBQ2hDLENBQUM7SUFDRCxzQkFBSSxvQ0FBSTthQUFSO1lBQ0UsTUFBTSxDQUFDLGFBQWEsQ0FBQztRQUN2QixDQUFDOzs7T0FBQTtJQUNELGtDQUFLLEdBQUwsVUFBTSxJQUF3QjtRQUF4QixvQkFBd0IsR0FBeEIsT0FBZSxJQUFJLENBQUMsSUFBSTtRQUM1QixNQUFNLENBQUMsZ0JBQUssQ0FBQyxLQUFLLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILHlCQUFDO0FBQUQsQ0FBQyxBQXRCRCxDQUF3QyxLQUFLLEdBc0I1QztBQXRCWSwwQkFBa0IscUJBc0I5QixDQUFBO0FBRUQ7SUFBaUMsK0JBQUs7SUFLcEMscUJBQVksS0FBeUI7UUFDbkMsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQXdCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ08sK0JBQVMsR0FBakIsVUFBa0IsS0FBZ0I7UUFDaEMsSUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLGdCQUFnQixFQUFFLEtBQUssRUFBRSxHQUFHLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUNyRixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsRUFBRSxZQUFLLEVBQUUsVUFBSSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUNELHNCQUFJLDZCQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2hCLENBQUM7OztPQUFBO0lBQ0QsMkJBQUssR0FBTCxVQUFNLElBQXdCO1FBQXhCLG9CQUF3QixHQUF4QixPQUFlLElBQUksQ0FBQyxJQUFJO1FBQzVCLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLEtBQUssWUFBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0gsa0JBQUM7QUFBRCxDQUFDLEFBcEJELENBQWlDLEtBQUssR0FvQnJDO0FBcEJZLG1CQUFXLGNBb0J2QixDQUFBO0FBR0Q7SUFBbUMsaUNBQUs7SUFNdEMsdUJBQVksS0FBeUI7UUFDbkMsaUJBQU8sQ0FBQztRQUNSLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQXdCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0lBQ08saUNBQVMsR0FBakIsVUFBa0IsS0FBZ0I7UUFDaEMsSUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsRUFDN0MsWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsRUFDdEQsWUFBWSxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsRUFBRSxjQUFNLEVBQUUsMEJBQVksRUFBRSwwQkFBWSxFQUFFLENBQUM7SUFDaEQsQ0FBQztJQUNELHNCQUFJLCtCQUFJO2FBQVI7WUFDRSxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ2xCLENBQUM7OztPQUFBO0lBQ0QsNkJBQUssR0FBTCxVQUFNLElBQXdCO1FBQXhCLG9CQUF3QixHQUF4QixPQUFlLElBQUksQ0FBQyxJQUFJO1FBQzVCLE1BQU0sQ0FBQyxnQkFBSyxDQUFDLEtBQUssWUFBQyxJQUFJLENBQUMsQ0FBQztJQUMzQixDQUFDO0lBQ0gsb0JBQUM7QUFBRCxDQUFDLEFBdEJELENBQW1DLEtBQUssR0FzQnZDO0FBdEJZLHFCQUFhLGdCQXNCekIsQ0FBQTtBQUVEO0lBQW9DLGtDQUFLO0lBSXZDLHdCQUFZLEtBQXlCO1FBQ25DLGlCQUFPLENBQUM7UUFDUixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUF3QixDQUFDLENBQUM7SUFDdEUsQ0FBQztJQUNPLGtDQUFTLEdBQWpCLFVBQWtCLEtBQWdCO1FBQ2hDLElBQU0sT0FBTyxHQUFHLElBQUksR0FBRyxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDbEQsTUFBTSxDQUFDLEVBQUUsZ0JBQU8sRUFBRSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxzQkFBSSxnQ0FBSTthQUFSO1lBQ0UsTUFBTSxDQUFDLFNBQVMsQ0FBQztRQUNuQixDQUFDOzs7T0FBQTtJQUNELDhCQUFLLEdBQUwsVUFBTSxJQUF3QjtRQUF4QixvQkFBd0IsR0FBeEIsT0FBZSxJQUFJLENBQUMsSUFBSTtRQUM1QixNQUFNLENBQUMsZ0JBQUssQ0FBQyxLQUFLLFlBQUMsSUFBSSxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUNILHFCQUFDO0FBQUQsQ0FBQyxBQWxCRCxDQUFvQyxLQUFLLEdBa0J4QztBQWxCWSxzQkFBYyxpQkFrQjFCLENBQUEifQ==