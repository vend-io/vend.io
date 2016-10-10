import * as FSM from 'state.js'
import VMModel from './model';

/**
 * Operational:
 * |----------------------------------------------|
 * |       |-----------|       |-----------|      |
 * | *---->|   Idle    |<----->|  Active   |      |
 * |       |-----------|       |-----------|      |
 * |            ^                                 |
 * |            |                                 |
 * |            v                                 |
 * |       |------------------|                   |
 * |       |  Out of Service  |                   |
 * |       |------------------|                   |
 * |----------------------------------------------|
 */

abstract class State {
  states: any
  transition(from: string, to: FSM.State | string): FSM.Transition {
    return this.state(from).to(typeof to === 'string' ? this.state(to) : to)
  }
  state(name): FSM.State {
    return this.states[name]
  }
}

export class VMOperationalState extends State {
  model: VMModel
  constructor(model: VMModel) {
    super()
    this.model = model
    this.states = this.setStates(model)
  }
  private setStates(model: FSM.StateMachine) {
    const start = new FSM.PseudoState('vm-operational-state-start', model, FSM.PseudoStateKind.Initial), //check
    operational = new FSM.State('vm-operational-state-operational', model);
    return { start, operational }
  }
}

export class VMIdleState extends State {
  constructor(state: VMOperationalState) {
    super()
    this.states = this.setStates(state.states.operational as FSM.State)
  }
  private setStates(state: FSM.State) {
    const start = new FSM.PseudoState('vm-idle-state-start', state, FSM.PseudoStateKind.Initial), //check
    idle = new FSM.State('vm-idle-state-idle', state);
    return { start, idle }
  }
}


export class VMActiveState extends State {
  constructor(state: VMOperationalState) {
    super()
    this.states = this.setStates(state.states.operational as FSM.State)
  }
  private setStates(state: FSM.State) {
    const active = new FSM.State('vm-active-state-active', state), // check
    coinInserted = new FSM.State('vm-active-state-coinInserted', active), // check
    itemSelected = new FSM.State('vm-active-state-itemSelected', active); // check
    return { active, coinInserted, itemSelected }
  }
}

// export class VMServiceState extends State {
//     constructor(state: VMOperationalState) {
//       super()
//       this.states = this.setStates(state.states.operational as FSM.State)
//     }
//     private setStates(state: FSM.State) {
//       const service = new FSM.State('vm-service-state-service', state),
//       maintainerAuthenticated = new FSM.State('vm-service-state-')
//       return { service }
//     }
// }
