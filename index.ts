import VMModel from './src/model';
import * as State from './src/states';
import * as FSM from 'state.js'

var model = new VMModel()
var operational = new State.VMOperationalState(model)
var idle = new State.VMIdleState(operational)
var active = new State.VMActiveState(operational)
// var service = new State.VMServiceState(operational)

operational.transition('start', 'operational')
idle.transition('start', 'idle')

idle.transition('idle', active.state('coinInserted')).when(s => s === 'coinInserted')
idle.transition('idle', active.state('itemSelected')).when(s => s === 'itemSelected')
// idle.transition('idle', service.state('service'))
active.transition('active', idle.state('idle')).when(s => s === 'canceled')

FSM.validate(model)
/* create the state machine instance */
var instance = new FSM.StateMachineInstance("instance");

/* initialise the state machine model and instance */
FSM.initialise(model, instance);

FSM.evaluate(model, instance, 'coinInserted');
