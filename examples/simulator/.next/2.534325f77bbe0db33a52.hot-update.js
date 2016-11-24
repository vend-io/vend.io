webpackHotUpdate(2,{

/***/ 629:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _getPrototypeOf = __webpack_require__(1);

	var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

	var _classCallCheck2 = __webpack_require__(27);

	var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

	var _createClass2 = __webpack_require__(28);

	var _createClass3 = _interopRequireDefault(_createClass2);

	var _possibleConstructorReturn2 = __webpack_require__(32);

	var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

	var _inherits2 = __webpack_require__(79);

	var _inherits3 = _interopRequireDefault(_inherits2);

	var _react = __webpack_require__(87);

	var _react2 = _interopRequireDefault(_react);

	var _jquery = __webpack_require__(630);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _semanticUiReact = __webpack_require__(95);

	var _vend = __webpack_require__(611);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var Cash = _vend.Payment.Cash;

	var PaymentPanel = function (_React$Component) {
	  (0, _inherits3.default)(PaymentPanel, _React$Component);

	  function PaymentPanel(props) {
	    (0, _classCallCheck3.default)(this, PaymentPanel);

	    var _this = (0, _possibleConstructorReturn3.default)(this, (PaymentPanel.__proto__ || (0, _getPrototypeOf2.default)(PaymentPanel)).call(this, props));

	    _this.state = { amount: 0, message: '' };
	    return _this;
	  }

	  (0, _createClass3.default)(PaymentPanel, [{
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var _this2 = this;

	      var _props$machine = this.props.machine,
	          payment = _props$machine.payment,
	          selection = _props$machine.selection;

	      payment.method = new Cash();

	      payment.onProcess(function (amount, change, success) {
	        var selected = selection.selected[0];
	        if (selected) {
	          if (success) {
	            _this2.setState({ amount: payment.value,
	              message: selected.quantity > 0 ? (change > 0 ? 'Returning $' + change.toFixed(2) + '.\n' : '') + 'Enjoy your product! Have a nice day.' : 'Item is out of stock.'
	            });
	            console.log(payment.change);
	          } else {
	            _this2.setState({ message: 'Please use an alternative form of payment.' });
	          }
	        } else {
	          _this2.setState({ message: 'Item is out of stock.' });
	        }
	        setTimeout(function () {
	          _this2.setState({ message: '' });
	        }, 8000);
	      });

	      payment.onCancel(function (change) {
	        _this2.setState({ message: 'Returning $' + change.toFixed(2) });
	        setTimeout(function () {
	          _this2.setState({ message: '' });
	        }, 8000);
	      });
	    }
	  }, {
	    key: 'submitHandler',
	    value: function submitHandler(event) {
	      event.preventDefault();
	    }
	  }, {
	    key: 'paymentHandler',
	    value: function paymentHandler(event) {
	      var machine = this.props.machine;

	      console.log('selected', machine.selection.selected.length > 0);
	      var previousValue = parseFloat(this.state.amount);
	      var newValue = parseFloat((0, _jquery2.default)('input[name="amountInput"]').val());
	      var amount = isNaN(newValue) ? 0 : (previousValue + newValue).toFixed(2);
	      this.setState({ amount: amount });
	      machine.pay(parseFloat(amount));
	      (0, _jquery2.default)('input[name="amountInput"]').val('');
	    }
	  }, {
	    key: 'clearHandler',
	    value: function clearHandler(event) {
	      var machine = this.props.machine;

	      this.setState({
	        amount: 0
	      });
	      (0, _jquery2.default)('input[name="amountInput"]').val('');
	      machine.cancel();
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var machine = this.props.machine;

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement(
	          _semanticUiReact.Card,
	          { style: { width: '100%' } },
	          _react2.default.createElement(
	            _semanticUiReact.Card.Content,
	            null,
	            _react2.default.createElement(
	              _semanticUiReact.Card.Header,
	              { style: { 'fontSize': '5em', 'textAlign': 'left' } },
	              _react2.default.createElement(_semanticUiReact.Icon, { name: 'dollar' }),
	              this.state.amount
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _semanticUiReact.Form,
	          { onSubmit: this.submitHandler.bind(this) },
	          _react2.default.createElement(
	            _semanticUiReact.Form.Field,
	            null,
	            _react2.default.createElement(
	              'label',
	              null,
	              'Amount: '
	            ),
	            _react2.default.createElement(_semanticUiReact.Input, { id: 'amountInput', name: 'amountInput', icon: 'dollar', iconPosition: 'left', autoComplete: 'off' })
	          ),
	          _react2.default.createElement(
	            _semanticUiReact.Form.Field,
	            null,
	            _react2.default.createElement(
	              _semanticUiReact.Button,
	              { animated: 'vertical', onClick: this.paymentHandler.bind(this) },
	              _react2.default.createElement(
	                _semanticUiReact.Button.Content,
	                { hidden: true },
	                'Insert'
	              ),
	              _react2.default.createElement(
	                _semanticUiReact.Button.Content,
	                { visible: true },
	                _react2.default.createElement(_semanticUiReact.Icon, { name: 'money' })
	              )
	            ),
	            _react2.default.createElement(
	              _semanticUiReact.Button,
	              { animated: 'vertical', onClick: this.clearHandler.bind(this) },
	              _react2.default.createElement(
	                _semanticUiReact.Button.Content,
	                { hidden: true },
	                'Clear'
	              ),
	              _react2.default.createElement(
	                _semanticUiReact.Button.Content,
	                { visible: true },
	                _react2.default.createElement(_semanticUiReact.Icon, { name: 'remove' })
	              )
	            )
	          )
	        ),
	        _react2.default.createElement(
	          _semanticUiReact.Card,
	          { style: { width: '100%' } },
	          _react2.default.createElement(
	            _semanticUiReact.Card.Content,
	            null,
	            _react2.default.createElement(
	              _semanticUiReact.Card.Header,
	              { style: { 'fontSize': '1em', 'textAlign': 'left' } },
	              this.state.message.split('\n').map(function (item, i) {
	                return _react2.default.createElement(
	                  'span',
	                  { key: i.toString() },
	                  item,
	                  _react2.default.createElement('br', null)
	                );
	              })
	            )
	          )
	        )
	      );
	    }
	  }]);
	  return PaymentPanel;
	}(_react2.default.Component);

	exports.default = PaymentPanel;

/***/ }

})