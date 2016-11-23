'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = require('/Users/takeshi/Documents/GitHub/vend.io/examples/simulator/node_modules/babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = require('/Users/takeshi/Documents/GitHub/vend.io/examples/simulator/node_modules/babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('/Users/takeshi/Documents/GitHub/vend.io/examples/simulator/node_modules/babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require('/Users/takeshi/Documents/GitHub/vend.io/examples/simulator/node_modules/babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('/Users/takeshi/Documents/GitHub/vend.io/examples/simulator/node_modules/babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('/Users/takeshi/Documents/GitHub/vend.io/examples/simulator/node_modules/react/react.js');

var _react2 = _interopRequireDefault(_react);

var _semanticUiReact = require('semantic-ui-react');

var _machine = require('../machine');

var _item = require('../components/panels/item');

var _item2 = _interopRequireDefault(_item);

var _payment = require('../components/panels/payment');

var _payment2 = _interopRequireDefault(_payment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
    'margin': '100px 100px'
};

var App = function (_React$Component) {
    (0, _inherits3.default)(App, _React$Component);

    function App() {
        (0, _classCallCheck3.default)(this, App);
        return (0, _possibleConstructorReturn3.default)(this, (App.__proto__ || (0, _getPrototypeOf2.default)(App)).apply(this, arguments));
    }

    (0, _createClass3.default)(App, [{
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { id: 'app', style: style },
                _react2.default.createElement('link', { rel: 'stylesheet', href: '//cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.2/semantic.min.css' }),
                _react2.default.createElement(
                    _semanticUiReact.Grid,
                    { columns: 'equal', divided: true },
                    _react2.default.createElement(
                        _semanticUiReact.Grid.Row,
                        { stretched: true },
                        _react2.default.createElement(
                            _semanticUiReact.Grid.Column,
                            { width: 10 },
                            _react2.default.createElement(
                                _semanticUiReact.Segment,
                                null,
                                _react2.default.createElement(_item2.default, { machine: _machine.machine })
                            )
                        ),
                        _react2.default.createElement(
                            _semanticUiReact.Grid.Column,
                            null,
                            _react2.default.createElement(
                                _semanticUiReact.Segment,
                                null,
                                _react2.default.createElement(_payment2.default, { machine: _machine.machine })
                            )
                        )
                    )
                )
            );
        }
    }]);
    return App;
}(_react2.default.Component);

exports.default = App;
    if (module.hot) {
      module.hot.accept()

      var Component = module.exports.default || module.exports
      Component.__route = "/"

      if (module.hot.status() !== 'idle') {
        var components = next.router.components
        for (var r in components) {
          if (!components.hasOwnProperty(r)) continue

          if (components[r].Component.__route === "/") {
            next.router.update(r, Component)
          }
        }
      }
    }
  