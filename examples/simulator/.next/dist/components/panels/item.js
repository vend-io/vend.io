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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ItemPanel = function (_React$Component) {
  (0, _inherits3.default)(ItemPanel, _React$Component);

  function ItemPanel(props) {
    (0, _classCallCheck3.default)(this, ItemPanel);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ItemPanel.__proto__ || (0, _getPrototypeOf2.default)(ItemPanel)).call(this, props));

    _this.state = { items: [], selected: null };
    return _this;
  }

  (0, _createClass3.default)(ItemPanel, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      this.setState({
        items: this.props.machine.inventory.items
      });
      this.props.machine.inventory.onUpdate(function (items) {
        _this2.setState({ items: items });
      });
    }
  }, {
    key: 'select',
    value: function select(event) {
      var machine = this.props.machine;

      var id = event.currentTarget.id.replace('item.', '');
      machine.selectById(id);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var machine = this.props.machine;

      return _react2.default.createElement(
        'div',
        null,
        _react2.default.createElement(
          _semanticUiReact.Card.Group,
          { itemsPerRow: machine.options.ui.columns },
          this.state.items.map(function (item) {
            return item.toJSON();
          }).map(function (item) {
            return _react2.default.createElement(
              _semanticUiReact.Card,
              { key: item.id.toString(), id: 'item.' + item.id, onClick: _this3.select.bind(_this3), style: { width: '40%' } },
              _react2.default.createElement(_semanticUiReact.Image, { src: item.image.url, style: { width: 'auto' } }),
              _react2.default.createElement(
                _semanticUiReact.Card.Content,
                null,
                _react2.default.createElement(
                  _semanticUiReact.Card.Header,
                  null,
                  item.name
                ),
                _react2.default.createElement(
                  _semanticUiReact.Card.Description,
                  null,
                  item.description
                )
              ),
              _react2.default.createElement(
                _semanticUiReact.Card.Content,
                { extra: true },
                _react2.default.createElement(
                  'span',
                  null,
                  'Cost: ',
                  _react2.default.createElement(_semanticUiReact.Icon, { name: 'dollar' }),
                  item.cost.toFixed(2)
                ),
                _react2.default.createElement('br', null),
                _react2.default.createElement(
                  'span',
                  null,
                  'Availability: ',
                  item.quantity > 0 ? 'In Stock' : 'Out of Stock',
                  ' (',
                  item.quantity,
                  ')'
                ),
                _react2.default.createElement('br', null)
              )
            );
          })
        )
      );
    }
  }]);
  return ItemPanel;
}(_react2.default.Component);

exports.default = ItemPanel;