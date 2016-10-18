"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vm_1 = require("./src/vm");
var _ = require("lodash");
var chalk = require("chalk");
var payload = {
    'vendor': 'Sodalicious!',
    'items': [{
            'id': 1,
            'name': 'Pepsi®',
            'logo': 'http://www.pepsi.com/en-us/assets/images/logo.png',
            'img': 'http://ncimages.pepsi.com/Zz00YjdlZjQxM2Y3OWY4OTc5ZWU2MDUyMmEyODQxNzZjMQ==?width=760',
            'description': 'Some flavor that appeals to millions!'
        }
    ]
};
var VM = (function (_super) {
    __extends(VM, _super);
    function VM() {
        var _this = _super.apply(this, arguments) || this;
        _this.amount = 0.00;
        _this.selectedItems = [];
        return _this;
    }
    VM.prototype.insertCoin = function (amount) {
        this.evaluate(vm_1.VMActions.InsertCoin);
        this.amount += amount;
    };
    VM.prototype.selectItem = function (item) {
        this.evaluate(vm_1.VMActions.SelectItem);
        this.selectedItems.push(item);
        this.selectedItems = _.uniqBy(this.selectedItems, 'id');
    };
    VM.prototype.authenticate = function () {
        this.evaluate(vm_1.VMActions.Authenticate);
    };
    VM.prototype.complete = function () {
        this.evaluate(vm_1.VMActions.Complete);
    };
    VM.prototype.cancel = function () {
        this.evaluate(vm_1.VMActions.Cancel);
        this.selectedItems = _.remove(this.selectedItems);
        this.amount = 0.00;
    };
    VM.prototype.getTotal = function () {
        return this.amount;
    };
    return VM;
}(vm_1.VMCore));
exports.VM = VM;
var sodavm = new VM({ debug: false });
sodavm.insertCoin(0.25);
sodavm.insertCoin(0.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.complete();
console.log(chalk.green('Total amount: ') + " $" + sodavm.getTotal());
