import { VMActions, VM } from './src/vm'

export function vm(options: any = {}) {
  return new VM(options);
}

const sodavm = vm({ debug: true })
sodavm.states.idle.entry(function() {
  console.log('entering idle state!')
}).exit(function() {
  console.log('leaving idle state!')
})
sodavm.insertCoin();
sodavm.selectItem();
sodavm.cancel();
