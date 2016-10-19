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
        if (options.debug)
            FSM.setConsole(util_1.logger);
        _super.prototype.setupStateMachine.call(this);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsc0JBQW9CLFNBQVMsQ0FBQyxDQUFBO0FBQzlCLElBQVksS0FBSyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBQ2xDLElBQVksR0FBRyxXQUFNLFVBQVUsQ0FBQyxDQUFBO0FBQ2hDLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLHFCQUF1QixRQUFRLENBQUMsQ0FBQTtBQUtoQyxXQUFZLFNBQVM7SUFDbkIscURBQVUsQ0FBQTtJQUNWLHFEQUFVLENBQUE7SUFDVix5REFBWSxDQUFBO0lBQ1osNkNBQU0sQ0FBQTtJQUNOLGlEQUFRLENBQUE7QUFDVixDQUFDLEVBTlcsaUJBQVMsS0FBVCxpQkFBUyxRQU1wQjtBQU5ELElBQVksU0FBUyxHQUFULGlCQU1YLENBQUE7QUFFRDtJQUFBO0lBdUVBLENBQUM7SUEvRFcsMENBQWlCLEdBQTNCO1FBQ0UsSUFBSSxDQUFDLHdCQUF3QixFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUE7UUFDOUIsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUE7UUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUVuRCxHQUFHLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUV4QixHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDTyxpREFBd0IsR0FBaEM7UUFDRSxJQUFJLENBQUMsT0FBTyxHQUFHO1lBQ2IsR0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDLEdBQUcsY0FBYztZQUN2QyxHQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsR0FBRyxjQUFjO1lBQ3ZDLEdB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