"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require('./model');
var State = require('./states');
var FSM = require('state.js');
var _ = require('lodash');
var util_1 = require('./util');
(function (VMActions) {
    VMActions[VMActions["InsertCoin"] = 0] = "InsertCoin";
    VMActions[VMActions["SelectItem"] = 1] = "SelectItem";
    VMActions[VMActions["Authenticate"] = 2] = "Authenticate";
    VMActions[VMActions["Cancel"] = 3] = "Cancel";
    VMActions[VMActions["Complete"] = 4] = "Complete";
})(exports.VMActions || (exports.VMActions = {}));
var VMActions = exports.VMActions;
var VMStateMachine = (function () {
    function VMStateMachine() {
    }
    VMStateMachine.prototype.setupStateMachine = function () {
        this.setupStateMachineActions();
        this.setupStateMachineStates();
        this.setupStateMachineTransitions();
        this.instance = new FSM.StateMachineInstance('vm');
        FSM.validate(this.model);
        FSM.initialise(this.model, this.instance);
    };
    VMStateMachine.prototype.setupStateMachineActions = function () {
        this.actions = (_a = {},
            _a[VMActions.InsertCoin] = 'coinInserted',
            _a[VMActions.SelectItem] = 'itemSelected',
            _a[VMActions.Authenticate] = 'isAuthenticated',
            _a[VMActions.Cancel] = 'canceled',
            _a[VMActions.Complete] = 'completed',
            _a
        );
        var _a;
    };
    VMStateMachine.prototype.setupStateMachineStates = function () {
        this.model = new model_1.default();
        this.operational = new State.VMOperationalState(this.model);
        this.idle = new State.VMIdleState(this.operational);
        this.active = new State.VMActiveState(this.operational);
        this.service = new State.VMServiceState(this.operational);
    };
    VMStateMachine.prototype.setupStateMachineTransitions = function () {
        var _this = this;
        this.operational.transition('start', this.operational.name);
        this.idle.transition('start', this.idle.name);
        var coinInserted = function (s) { return s === _this.actions[VMActions.InsertCoin]; };
        var itemSelected = function (s) { return s === _this.actions[VMActions.SelectItem]; };
        var isAuthenticated = function (s) { return s === _this.actions[VMActions.Authenticate]; };
        var canceled = function (s) { return s === _this.actions[VMActions.Cancel]; };
        var completed = function (s) { return s === _this.actions[VMActions.Complete]; };
        this.idle
            .transition(this.active.state(this.actions[VMActions.InsertCoin]))
            .when(coinInserted);
        this.idle
            .transition(this.active.state(this.actions[VMActions.SelectItem]))
            .when(itemSelected);
        this.idle
            .transition(this.service.state())
            .when(isAuthenticated);
        this.active
            .transition(this.idle.state())
            .when(function (s) { return canceled(s) || completed(s); });
        this.service
            .transition(this.idle.state())
            .when(function (s) { return canceled(s) || completed(s); });
    };
    VMStateMachine.prototype.evaluate = function (action) {
        FSM.evaluate(this.model, this.instance, this.actions[action]);
    };
    return VMStateMachine;
}());
exports.VMStateMachine = VMStateMachine;
var VMCore = (function (_super) {
    __extends(VMCore, _super);
    function VMCore(options) {
        if (options === void 0) { options = {}; }
        _super.call(this);
        this.defaults = {
            debug: false
        };
        _.defaultsDeep(options, this.defaults);
        if (options.debug) {
            FSM.setConsole(util_1.terminal);
        }
        this.setupStateMachine();
    }
    Object.defineProperty(VMCore.prototype, "states", {
        get: function () {
            return { idle: this.idle, active: this.active, service: this.service };
        },
        enumerable: true,
        configurable: true
    });
    return VMCore;
}(VMStateMachine));
exports.VMCore = VMCore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uY29yZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy92bS5jb3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHNCQUFvQixTQUFTLENBQUMsQ0FBQTtBQUM5QixJQUFZLEtBQUssV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNsQyxJQUFZLEdBQUcsV0FBTSxVQUFVLENBQUMsQ0FBQTtBQUNoQyxJQUFZLENBQUMsV0FBTSxRQUFRLENBQUMsQ0FBQTtBQUM1QixxQkFBeUIsUUFBUSxDQUFDLENBQUE7QUFFbEMsV0FBWSxTQUFTO0lBQ25CLHFEQUFVLENBQUE7SUFDVixxREFBVSxDQUFBO0lBQ1YseURBQVksQ0FBQTtJQUNaLDZDQUFNLENBQUE7SUFDTixpREFBUSxDQUFBO0FBQ1YsQ0FBQyxFQU5XLGlCQUFTLEtBQVQsaUJBQVMsUUFNcEI7QUFORCxJQUFZLFNBQVMsR0FBVCxpQkFNWCxDQUFBO0FBRUQ7SUFBQTtJQXVFQSxDQUFDO0lBL0RXLDBDQUFpQixHQUEzQjtRQUNFLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO1FBQy9CLElBQUksQ0FBQyw0QkFBNEIsRUFBRSxDQUFDO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsb0JBQW9CLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbkQsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7UUFFekIsR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ08saURBQXdCLEdBQWhDO1FBQ0UsSUFBSSxDQUFDLE9BQU8sR0FBRztZQUNiLEdBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxHQUFFLGNBQWM7WUFDdEMsR0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUUsY0FB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