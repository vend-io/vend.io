import * as FSM from 'state.js'
import VMModel from './model';


// Operational:
// |----------------------------------------------|
// |       |-----------|       |-----------|      |
// | •----▶|   Idle    |◀-----▶|  Active   |      |
// |       |-----------|       |-----------|      |
// |            ▲                                 |
// |            |                                 |
// |            ▼                                 |
// |       |------------------|                   |
// |       |     Service      |                   |
// |       |------------------|                   |
// |----------------------------------------------|

abstract class State {
  abstract states: any
  /**
   * Transitions a state to another state.
   * @param  {FSM.State   | string}      state The current state (self) or the initial state
   * @param  {FSM.State   | string}      to    The state to transition to
   * @return {FSM.Transition}   A FSM.Transition instance
   */
  transition(state: FSM.State | string, to?: FSM.State | string): FSM.Transition {
    if (!to) return this.state(this.name).to(state as FSM.State)
    return this.state(state as string).to(typeof to === 'string' ? this.state(to) : to)
  }
  state(name: string): FSM.State {
    return this.states[name]
  }
  abstract get name() : string;
}

export class VMOperationalState extends State {
  model: VMModel
  states: {
    start: FSM.PseudoState,
    operational: FSM.State
  }
  constructor(model: VMModel) {
    super()
    this.model = model
    this.states = this.setStates(model)
  }
  private setStates(model: FSM.StateMachine) {
    const start = new FSM.PseudoState('[operational].(start)', model, FSM.PseudoStateKind.Initial), //check
    operational = new FSM.State('[operational]', model);
    return { start, operational };
  }
  get name() : string {
    return 'operational';
  }
  state(name: string = this.name) {
    return super.state(name);
  }
}

export class VMIdleState extends State {
  states: {
    start: FSM.PseudoState,
    idle: FSM.State
  }
  constructor(state: VMOperationalState) {
    super()
    this.states = this.setStates(state.states.operational as FSM.State)
  }
  private setStates(state: FSM.State) {
    const start = new FSM.PseudoState('[idle].(start)', state, FSM.PseudoStateKind.Initial), //check
    idle = new FSM.State('[idle]', state);
    return { start, idle }
  }
  get name(): string {
    return 'idle'
  }
  state(name: string = this.name) {
    return super.state(name);
  }
}


export class VMActiveState extends State {
  states: {
    active: FSM.State,
    coinInserted: FSM.State,
    itemSelected: FSM.State
  }
  constructor(state: VMOperationalState) {
    super()
    this.states = this.setStates(state.states.operational as FSM.State)
  }
  private setStates(state: FSM.State) {
    const active = new FSM.State('[active]', state), // check
    coinInserted = new FSM.State('(coinInserted)', active), // check
    itemSelected = new FSM.State('(itemSelected)', active); // check
    return { active, coinInserted, itemSelected }
  }
  get name(): string {
    return 'active'
  }
  state(name: string = this.name) {
    return super.state(name);
  }
}

export class VMServiceState extends State {
    states: {
      service: FSM.State,
    }
    constructor(state: VMOperationalState) {
      super()
      this.states = this.setStates(state.states.operational as FSM.State)
    }
    private setStates(state: FSM.State) {
      const service = new FSM.State('(service)', state);
      return { service }
    }
    get name(): string {
      return 'service'
    }
    state(name: string = this.name) {
      return super.state(name);
    }
}
