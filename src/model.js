"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var FSM = require("state.js");
var VMModel = (function (_super) {
    __extends(VMModel, _super);
    function VMModel() {
        return _super.call(this, 'vm-model') || this;
    }
    return VMModel;
}(FSM.StateMachine));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = VMModel;
