import { VMActions, VMCore } from './vm.core';
import * as _ from 'lodash';
import * as chalk from 'chalk';

const payload = {
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

export class VM extends VMCore {
  private amount: number = 0.00;
  private selectedItems: any[] = [];
  insertCoin(amount: number) {
    // Move to active state (coinInserted)
    this.evaluate(VMActions.InsertCoin);
    this.amount += amount;
  }
  selectItem(item: any) {
    // Move to active state (itemSelected)
    this.evaluate(VMActions.SelectItem);
    // Remove any duplicate items if it already exits (acts as toggle)
    this.selectedItems.push(item);
    this.selectedItems = _.uniqBy(this.selectedItems, 'id');
  }
  authenticate() {
    // Move to service state
    // TODO: Move to service state only if the maintainer is authenticated
    this.evaluate(VMActions.Authenticate);
  }
  complete() {
    // Move to idle state
    this.evaluate(VMActions.Complete);
  }
  cancel() {
    // Move to idle state
    this.evaluate(VMActions.Cancel);
    this.selectedItems = _.remove(this.selectedItems);
    this.amount = 0.00;
  }
  getTotal(): number {
    return this.amount;
  }
}


const sodavm = new VM({ debug: true });
//
sodavm.insertCoin(0.25);
sodavm.insertCoin(0.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.complete();
console.log(`${chalk.green('Total amount: ')} $${sodavm.getTotal()}`);
