import VMModel from './model';
import * as State from './states';
import * as FSM from 'state.js';
import * as _ from 'lodash';
import { logger } from './util';

///<reference types="./typings/node/node.d.ts" />
// import { EventEmitter } from 'events';

export enum VMActions {
  InsertCoin,
  SelectItem,
  Authenticate,
  Cancel,
  Complete
}

export class VMStateMachine {
  protected model: VMModel;
  protected operational: State.VMOperationalState;
  protected idle: State.VMIdleState;
  protected active: State.VMActiveState;
  protected service: State.VMServiceState;
  protected instance: FSM.StateMachineInstance;
  protected actions: { [x: number]: string }
  protected setupStateMachine() {
    this.setupStateMachineActions();
    this.setupStateMachineStates()
    this.setupStateMachineTransitions()
    this.instance = new FSM.StateMachineInstance('vm');

    FSM.validate(this.model)
    /* initialise the state machine model and instance */
    FSM.initialise(this.model, this.instance);
  }
  private setupStateMachineActions () {
    this.actions = {
      [VMActions.InsertCoin] : 'coinInserted',
      [VMActions.SelectItem] : 'itemSelected',
      [VMActions.Authenticate]: 'isAuthenticated',
      [VMActions.Cancel]: 'canceled',
      [VMActions.Complete]: 'completed'
    };
  }
  private setupStateMachineStates() {
      this.model = new VMModel();
      this.operational = new State.VMOperationalState(this.model);
      this.idle = new State.VMIdleState(this.operational);
      this.active = new State.VMActiveState(this.operational)
      this.service = new State.VMServiceState(this.operational)
  }
  private setupStateMachineTransitions() {
    // Setup initial states
    this.operational.transition('start', this.operational.name)
    this.idle.transition('start', this.idle.name);

    // Setup transition conditions
    const coinInserted = s => s === this.actions[VMActions.InsertCoin]
    const itemSelected = s => s === this.actions[VMActions.SelectItem]
    const isAuthenticated = s => s === this.actions[VMActions.Authenticate]
    const canceled = s => s === this.actions[VMActions.Cancel]
    const completed = s => s === this.actions[VMActions.Complete]

    // Transition from 'idle' state to 'active' state when coin is inserted
    this.idle
      .transition(this.active.state(this.actions[VMActions.InsertCoin]))
      .when(coinInserted);
    // Transition from 'idle' state to 'active' state when item is selected
    this.idle
      .transition(this.active.state(this.actions[VMActions.SelectItem]))
      .when(itemSelected)
    // Transition from 'idle' state to 'service' state when authenticated
    this.idle
      .transition(this.service.state())
      .when(isAuthenticated);
    // Transition from active state to idle state when state is canceled or completed
    this.active
      .transition(this.idle.state())
      .when(s => canceled(s) || completed(s));
    // Transition from serviec state to active state when state is canceled or completed
    this.service
      .transition(this.idle.state())
      .when(s => canceled(s) || completed(s));

  }
  protected evaluate(action: VMActions) {
    FSM.evaluate(this.model, this.instance, this.actions[action])
  }
}


export abstract class VMCore extends VMStateMachine {
    protected defaults = {
      debug: false
    };
    // events: EventEmitter
    constructor(options: any = {}) {
      super()
      // this.events = new EventEmitter();
      _.defaultsDeep(options, this.defaults)
      if (options.debug) FSM.setConsole(logger)
      super.setupStateMachine()
    }
    protected get states (): ({
      idle: State.VMIdleState,
      active: State.VMActiveState,
      service: State.VMServiceState }) {
      return { idle: this.idle, active: this.active, service: this.service }
    }
    abstract insertCoin(amount: number)
    abstract selectItem(item: any)
    abstract authenticate()
    abstract complete()
    abstract cancel()
}
