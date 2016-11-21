# vend.io

An open source framework for vending machines (work in progress).

### Typescript branch: 
[![Build Status](https://travis-ci.org/vend-io/vend.io.svg?branch=typescript)](https://travis-ci.org/vend-io/vend.io)

Proposed features: support for multiple currencies, notification when stock reaches half, support for at least one item.


## Usage

```javascript
const { Core } = require('vend.io');
const machine = new Core(/* { options } */ );
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