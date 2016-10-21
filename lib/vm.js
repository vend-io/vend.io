"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vm_core_1 = require('./vm.core');
var _ = require('lodash');
var chalk = require('chalk');
var events_1 = require('events');
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
    function VM(options) {
        _super.call(this, options);
        this.amount = 0.00;
        this.selectedItems = [];
        this.events = new events_1.EventEmitter();
        this.setupStateMachineEvents();
    }
    VM.prototype.setupStateMachineEvents = function () {
        var _this = this;
        var idle = this.states.idle, active = this.states.active, service = this.states.service;
        idle.states.idle
            .entry(function (message) { return _this.events.emit('idle'); })
            .exit(function (message) { return _this.events.emit('idle.exit'); });
        active.states.active
            .entry(function (message) { return _this.events.emit('active'); })
            .exit(function (message) { return _this.events.emit('active.exit'); });
        service.states.service
            .entry(function (message) { return _this.events.emit('service'); })
            .exit(function (message) { return _this.events.emit('service.exit'); });
        active.states.coinInserted
            .entry(function (message) { return _this.events.emit('coinInserted'); })
            .exit(function (message) { return _this.events.emit('coinInserted.exit'); });
        active.states.itemSelected
            .entry(function (message) { return _this.events.emit('itemSelected'); })
            .exit(function (message) { return _this.events.emit('itemSelected.exit'); });
    };
    VM.prototype.on = function (event, callback) {
        this.events.on(event, callback);
        return this;
    };
    VM.prototype.insertCoin = function (amount) {
        this.evaluate(vm_core_1.VMActions.InsertCoin);
        this.amount += amount;
    };
    VM.prototype.selectItem = function (item) {
        this.evaluate(vm_core_1.VMActions.SelectItem);
        this.selectedItems.push(item);
        this.selectedItems = _.uniqBy(this.selectedItems, 'id');
    };
    VM.prototype.authenticate = function (callback) {
        if (callback()) {
            this.evaluate(vm_core_1.VMActions.Authenticate);
        }
    };
    VM.prototype.complete = function () {
        this.evaluate(vm_core_1.VMActions.Complete);
    };
    VM.prototype.cancel = function () {
        this.evaluate(vm_core_1.VMActions.Cancel);
        this.selectedItems = _.remove(this.selectedItems);
        this.amount = 0.00;
    };
    VM.prototype.getTotal = function () {
        return this.amount;
    };
    return VM;
}(vm_core_1.VMCore));
exports.VM = VM;
var sodavm = new VM({ debug: true });
sodavm
    .on('coinInserted', function () { return console.log('COIN INSERTED!'); })
    .on('service', function () { return console.log('IN SERVICE MODE!'); });
sodavm.insertCoin(0.25);
sodavm.insertCoin(0.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.complete();
console.log(chalk.green('Total amount: ') + " $" + sodavm.getTotal());
sodavm.authenticate(function () {
    return true;
});
sodavm.complete();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQWtDLFdBQVcsQ0FBQyxDQUFBO0FBQzlDLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBQy9CLHVCQUE2QixRQUFRLENBQUMsQ0FBQTtBQUN0QyxJQUFNLE9BQU8sR0FBRztJQUNkLFFBQVEsRUFBRSxjQUFjO0lBQ3hCLE9BQU8sRUFBRSxDQUFDO1lBQ1IsSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsbURBQW1EO1lBQzNELEtBQUssRUFBRSxzRkFBc0Y7WUFDN0YsYUFBYSxFQUFFLHVDQUF1QztTQUN2RDtLQUNBO0NBQ0YsQ0FBQztBQUdGO0lBQXdCLHNCQUFNO0lBSTVCLFlBQVksT0FBYTtRQUN2QixrQkFBTSxPQUFPLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1FBQ25CLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxxQkFBWSxFQUFFLENBQUM7UUFDakMsSUFBSSxDQUFDLHVCQUF1QixFQUFFLENBQUM7SUFDakMsQ0FBQztJQUNPLG9DQUF1QixHQUEvQjtRQUFBLGlCQW9CQztRQW5CQyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFDM0IsTUFBTSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUMzQixPQUFPLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJO2FBQ2IsS0FBSyxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsS0FBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMs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