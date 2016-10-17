"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var model_1 = require("./model");
var State = require("./states");
var FSM = require("state.js");
var _ = require("lodash");
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
        this.setupStateMachine();
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
            _a);
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
var VM = (function (_super) {
    __extends(VM, _super);
    function VM(options) {
        if (options === void 0) { options = {}; }
        var _this = _super.call(this) || this;
        _this.defaults = {
            debug: false
        };
        _.defaultsDeep(options, _this.defaults);
        if (options.debug)
            FSM.setConsole(console);
        return _this;
    }
    Object.defineProperty(VM.prototype, "states", {
        get: function () {
            return {
                idle: this.idle.state(),
                active: this.active.state(),
                service: this.service.state()
            };
        },
        enumerable: true,
        configurable: true
    });
    VM.prototype.insertCoin = function () {
        this.evaluate(VMActions.InsertCoin);
    };
    VM.prototype.selectItem = function () {
        this.evaluate(VMActions.SelectItem);
    };
    VM.prototype.authenticate = function () {
        this.evaluate(VMActions.Authenticate);
    };
    VM.prototype.complete = function () {
        this.evaluate(VMActions.Complete);
    };
    VM.prototype.cancel = function () {
        this.evaluate(VMActions.Cancel);
    };
    return VM;
}(VMStateMachine));
exports.VM = VM;
