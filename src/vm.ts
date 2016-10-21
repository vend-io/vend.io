import { VMActions, VMCore } from './vm.core';
import * as _ from 'lodash';
import * as chalk from 'chalk';
import { EventEmitter } from 'events';
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
  private amount: number;
  private selectedItems: any[];
  private events: EventEmitter;
  constructor(options?: any) {
    super(options);
    this.amount = 0.00;
    this.selectedItems = [];
    this.events = new EventEmitter();
    this.setupStateMachineEvents();
  }
  private setupStateMachineEvents() {
    const idle = this.states.idle,
      active = this.states.active,
      service = this.states.service;
    idle.states.idle
      .entry(message => this.events.emit('idle'))
      .exit(message => this.events.emit('idle.exit'));
    active.states.active
      .entry(message => this.events.emit('active'))
      .exit(message => this.events.emit('active.exit'));
    service.states.service
      .entry(message => this.events.emit('service'))
      .exit(message => this.events.emit('service.exit'));

    active.states.coinInserted
      .entry(message => this.events.emit('coinInserted'))
      .exit(message => this.events.emit('coinInserted.exit'));
    active.states.itemSelected
      .entry(message => this.events.emit('itemSelected'))
      .exit(message => this.events.emit('itemSelected.exit'));
  }
  on(event: string, callback: Function): VM {
    this.events.on(event, callback);
    return this;
  }
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
  authenticate(callback: () => boolean) {
    if (callback()) {
      // Move to service state
      this.evaluate(VMActions.Authenticate);
    }
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

sodavm
  .on('coinInserted', () => console.log('COIN INSERTED!'))
  .on('service', () => console.log('IN SERVICE MODE!'));

sodavm.insertCoin(0.25);
sodavm.insertCoin(0.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.insertCoin(1.25);
sodavm.complete();
console.log(`${chalk.green('Total amount: ')} $${sodavm.getTotal()}`);
sodavm.authenticate(function (): boolean {
  return true;
});
sodavm.complete();