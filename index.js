const { VM } = require('./lib/vm');

const vm = new VM();

vm.inventory.addItem({
  id: '1',
  name: 'Fanta Orange',
  cost: 1.00,
  quantity: 2
});
console.log(`Current state: ${vm.state}`)

vm.selectById('1');

console.log(`Current state: ${vm.state}`)

vm.setPaymentMethod('cash');

vm.pay(0.50);
console.log(`Paid (total): ${vm.payment.value}`);

console.log(`Current state: ${vm.state}`)

vm.selectById('1');

console.log(`Current state: ${vm.state}`)

vm.pay(0.50);
console.log(`Paid (total): ${vm.payment.value}`);

vm.selectById('1');

console.log(`Current state: ${vm.state}`)
