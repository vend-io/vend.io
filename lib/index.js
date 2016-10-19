"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vm_1 = require('./vm');
var _ = require('lodash');
var chalk = require('chalk');
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
        _super.apply(this, arguments);
        this.amount = 0.00;
        this.selectedItems = [];
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
var sodavm = new VM({ debug: true });
sodavm.insertCoin(0.25);
sodavm.insertCoin(0.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.complete();
console.log(chalk.green('Total amount: ') + " $" + sodavm.getTotal());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUJBQWtDLE1BQ2xDLENBQUMsQ0FEdUM7QUFDeEMsSUFBWSxDQUFDLFdBQU0sUUFDbkIsQ0FBQyxDQUQwQjtBQUMzQixJQUFZLEtBQUssV0FBTSxPQUFPLENBQUMsQ0FBQTtBQUUvQixJQUFNLE9BQU8sR0FBRztJQUNkLFFBQVEsRUFBRSxjQUFjO0lBQ3hCLE9BQU8sRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLENBQUM7WUFDUCxNQUFNLEVBQUUsUUFBUTtZQUNoQixNQUFNLEVBQUUsbURBQW1EO1lBQzNELEtBQUssRUFBRSxzRkFBc0Y7WUFDN0YsYUFBYSxFQUFFLHVDQUF1QztTQUN2RDtLQUNGO0NBQ0YsQ0FBQTtBQUVEO0lBQXdCLHNCQUFNO0lBQTlCO1FBQXdCLDhCQUFNO1FBQ2xCLFdBQU0sR0FBVyxJQUFJLENBQUE7UUFDckIsa0JBQWEsR0FBVSxFQUFFLENBQUE7SUErQnJDLENBQUM7SUE5QkcsdUJBQVUsR0FBVixVQUFXLE1BQWM7UUFFdkIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFTLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDbkMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUE7SUFDdkIsQ0FBQztJQUNELHVCQUFVLEdBQVYsVUFBVyxJQUFTO1FBRWxCLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFBO1FBRW5DLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQzdCLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3pELENBQUM7SUFDRCx5QkFBWSxHQUFaO1FBR0UsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFTLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUNELHFCQUFRLEdBQVI7UUFFRSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQTtJQUNuQyxDQUFDO0lBQ0QsbUJBQU0sR0FBTjtRQUVFLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUE7UUFDakQsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUE7SUFDcEIsQ0FBQztJQUNELHFCQUFRLEdBQVI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQTtJQUNwQixDQUFDO0lBQ0wsU0FBQztBQUFELENBQUMsQUFqQ0QsQ0FBd0IsV0FBTSxHQWlDN0I7QUFqQ1ksVUFBRSxLQWlDZCxDQUFBO0FBR0QsSUFBTSxNQUFNLEdBQUcsSUFBSSxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtBQUV0QyxNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ2xCLE9BQU8sQ0FBQyxHQUFHLENBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFLLE1BQU0sQ0FBQyxRQUFRLEVBQUksQ0FBQyxDQUFBIn0=