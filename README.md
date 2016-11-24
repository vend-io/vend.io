# vend.io

An open source framework for vending machines (work in progress).

[![Build Status](https://travis-ci.org/vend-io/vend.io.svg?branch=master)](https://travis-ci.org/vend-io/vend.io)

Proposed features: support for multiple currencies, notification when stock reaches half, support for at least one item.


## Usage

Install package:
```bash
# Since vend.io has not been published on npm,
# use the repo as the source.
npm i --save https://github.com/vend-io/vend.io.git
```
Import:
```javascript
const { Core, Payment, Item } = require('vend.io');
const { Cash } = Payment;

// Create a vending machine and enable debugging
const machine = new Core({ debug: true });
// Set payment method
machine.payment.method = new Cash();
// Add items to inventory
machine.inventory
.addItem(new Item(/* See documentation for formal parameters */));

// Enjoy!
machine.pay(0.50);
machine.selectById(1);
```

Try running some examples:
```bash
# Run a basic example
npm run example:basic
# Run a soda vending machine simulator
# and navigate to localhost:3000
npm run example:simulator
```

## Documentation

See [documentation](https://rawgit.com/vend-io/vend.io/master/docs/index.html) via RawGit.

## Contribute

See ESLint's pull request [guidelines](http://eslint.org/docs/developer-guide/contributing/pull-requests)

### Development Tools

Node.js v6.9+

Code Editor:
  * Visual Studio Code (recommended)
  * Atom (supported)

Code Editor Extensions:
  * Linting
    * TSLint (vscode)
    * linter-tslint (atom)
  * Editor Configuration
    * editorconfig (vscode, atom)
  * Syntax Highlighting
    * atom-typescript (atom)
