import { Core, Item } from 'vend.io';

const machine = new Core();
machine.options.debug = false;
// Setup machine
let id = 0;
const cost = 1.50;
const quantity = 10;
const images = [
    'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Coca-Cola-HFCS-1.25-Liter-Bottle.png',
    'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Fanta_Orange_1.5L.png',
    'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Fanta_Strawberry_16oz.png',
    'http://www.coca-colaproductfacts.com/content/dam/productfacts/us/productDetails/ProductImages/PDP_Sprite-HFCS-1-Liter-Bottle.png'
];
const sodas = [
    'Coca-Cola',
    'Fanta Orange',
    'Fanta Strawberry',
    'Sprite'
].map((name, i) => ({ name, image: images[i] }))
.forEach(i => {
    machine.inventory
    .addItem((new Item((id++).toString(), i.name, cost, quantity)))
    .findItemByName(i.name).imageURL = i.image
});

export { machine };