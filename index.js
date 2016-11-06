const { VM } = require('./lib/core');
const { Cash } = require('./lib/payment');
const Item = require('./lib/item').default;

const vm = new VM();
vm.inventory.addItem(new Item('1', 'Fanta Orange', 1.00, 2));
vm.payment.method = new Cash();

console.log(`Current state: ${vm.state.name}`);

vm.selectById('1');

console.log(`Current state: ${vm.state.name}`);

vm.pay(0.50);
console.log(`Paid (total): ${vm.payment.value}`);

console.log(`Current state: ${vm.state.name}`);

vm.selectById('1');

console.log(`Current state: ${vm.state.name}`);

vm.pay(0.50);
console.log(`Paid (total): ${vm.payment.value}`);

vm.selectById('1');

console.log(`Current state: ${vm.state.name}`);
