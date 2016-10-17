"use strict";
var vm_1 = require("./src/vm");
function vm(options) {
    if (options === void 0) { options = {}; }
    return new vm_1.VM(options);
}
exports.vm = vm;
var sodavm = vm({ debug: true });
sodavm.states.idle.entry(function () {
    console.log('entering idle state!');
}).exit(function () {
    console.log('leaving idle state!');
});
sodavm.insertCoin();
sodavm.selectItem();
sodavm.cancel();
