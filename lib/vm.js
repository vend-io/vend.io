"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var vm_core_1 = require('./vm.core');
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
        this.evaluate(vm_core_1.VMActions.InsertCoin);
        this.amount += amount;
    };
    VM.prototype.selectItem = function (item) {
        this.evaluate(vm_core_1.VMActions.SelectItem);
        this.selectedItems.push(item);
        this.selectedItems = _.uniqBy(this.selectedItems, 'id');
    };
    VM.prototype.authenticate = function () {
        this.evaluate(vm_core_1.VMActions.Authenticate);
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
sodavm.insertCoin(0.25);
sodavm.insertCoin(0.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.complete();
console.log(chalk.green('Total amount: ') + " $" + sodavm.getTotal());
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvdm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsd0JBQWtDLFdBQVcsQ0FBQyxDQUFBO0FBQzlDLElBQVksQ0FBQyxXQUFNLFFBQVEsQ0FBQyxDQUFBO0FBQzVCLElBQVksS0FBSyxXQUFNLE9BQU8sQ0FBQyxDQUFBO0FBRS9CLElBQU0sT0FBTyxHQUFHO0lBQ2QsUUFBUSxFQUFFLGNBQWM7SUFDeEIsT0FBTyxFQUFFLENBQUM7WUFDUixJQUFJLEVBQUUsQ0FBQztZQUNQLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLE1BQU0sRUFBRSxtREFBbUQ7WUFDM0QsS0FBSyxFQUFFLHNGQUFzRjtZQUM3RixhQUFhLEVBQUUsdUNBQXVDO1NBQ3ZEO0tBQ0E7Q0FDRixDQUFDO0FBRUY7SUFBd0Isc0JBQU07SUFBOUI7UUFBd0IsOEJBQU07UUFDcEIsV0FBTSxHQUFXLElBQUksQ0FBQztRQUN0QixrQkFBYSxHQUFVLEVBQUUsQ0FBQztJQStCcEMsQ0FBQztJQTlCQyx1QkFBVSxHQUFWLFVBQVcsTUFBYztRQUV2QixJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUM7SUFDeEIsQ0FBQztJQUNELHVCQUFVLEdBQVYsVUFBVyxJQUFTO1FBRWxCLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUVwQyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM5QixJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBQ0QseUJBQVksR0FBWjtRQUdFLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQVMsQ0FBQyxZQUFZLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBQ0QscUJBQVEsR0FBUjtRQUVFLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBQ0QsbUJBQU0sR0FBTjtRQUVFLElBQUksQ0FBQyxRQUFRLENBQUMsbUJBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ2xELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO0lBQ3JCLENBQUM7SUFDRCxxQkFBUSxHQUFSO1FBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztJQUNILFNBQUM7QUFBRCxDQUFDLEFBakNELENBQXdCLGdCQUFNLEdBaUM3QjtBQWpDWSxVQUFFLEtBaUNkLENBQUE7QUFHRCxJQUFNLE1BQU0sR0FBRyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO0FBRXZDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3hCLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDeEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN4QixNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7QUFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLFVBQUssTUFBTSxDQUFDLFFBQVEsRUFBSSxDQUFDLENBQUMifQ==