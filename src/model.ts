import * as FSM from 'state.js';

export default class VMModel extends FSM.StateMachine {
  constructor() {
    super('[model]');
  }
}
