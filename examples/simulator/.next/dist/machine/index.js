'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.machine = undefined;

var _vend = require('vend.io');

var machine = new _vend.Core();
machine.options.debug = false;
// Setup machine
var id = 0;
var cost = 1.50;
var quantity = 10;
var images = ['http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Coca-Cola-HFCS-1.25-Liter-Bottle.png', 'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Fanta_Orange_1.5L.png', 'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Fanta_Strawberry_16oz.png', 'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Sprite-HFCS-1-Liter-Bottle.png'];
var sodas = ['Coca-Cola', 'Fanta Orange', 'Fanta Strawberry', 'Sprite'].map(function (name, i) {
    return { name: name, image: images[i] };
}).forEach(function (i) {
    machine.inventory.addItem(new _vend.Item((id++).toString(), i.name, cost, quantity)).findItemByName(i.name).imageURL = i.image;
});

exports.machine = machine;