# vend.io

An open source framework for vending machines (work in progress).

[![Build Status](https://travis-ci.org/vend-io/vend.io.svg?branch=master)](https://travis-ci.org/vend-io/vend.io)

Proposed features: support for multiple currencies, notification when stock reaches half, support for at least one item.


## Usage

Install package:
```bash
# Since vend.io has not be published on npm,
# use the repo as the source.
npm i --save https://github.com/vend-io/vend.io.git
```
Import:
```javascript
const { Core, Payment } = require('vend.io');
const { Cash } = Payment;
const machine = new Core(/* { options } */);
machine.payment.method = new Cash();
```

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
