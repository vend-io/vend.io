import React from 'react';
import $ from 'jquery';
import { Form, Input, Button, Icon, Card, Image } from 'semantic-ui-react'
import { Payment } from 'vend.io';
const { Cash } = Payment;
export default class PaymentPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: 0, message: '', };
  }
  componentDidMount() {
    const { payment, selection, state } = this.props.machine;
    payment.method = new Cash();

    payment.onProcess((amount, change, success) => {
      const selected = selection.selected[0];
      if (selected) {
        if (success) {
          this.setState({ amount: payment.value, 
            message: 
            selected.quantity > 0 ? 
            `${change > 0 ? `Returning $${change.toFixed(2)}.\n`: ''}Enjoy your product! Have a nice day.` : 
            'Item is out of stock.'
          });
          console.log(payment.change, state.name);
        } else { this.setState({ message: 'Please use an alternative form of payment.' })}
      } else { this.setState({ message: 'Item is out of stock.' });  }
      setTimeout(() => { this.setState({ message: '' })}, 8000);
    });

    payment.onCancel((change) => {
      this.setState({ message: `Returning $${change.toFixed(2)}`});
      setTimeout(() => { this.setState({ message: '' })}, 8000);
    });
  }
  submitHandler(event) {
    event.preventDefault();
  }
  paymentHandler(event) {
    const { machine } = this.props;
    console.log('selected', machine.selection.selected.length > 0)
    const previousValue = parseFloat(this.state.amount);
    const newValue = parseFloat($('input[name="amountInput"]').val());
    const amount = isNaN(newValue) ? 0 : (previousValue + newValue).toFixed(2);
    this.setState({ amount })
    machine.pay(parseFloat(amount));
    $('input[name="amountInput"]').val('');
  }
  clearHandler(event) {
    const { machine } = this.props;
    this.setState({
      amount: 0,
    });
    $('input[name="amountInput"]').val('');
    machine.cancel();
  }
  render() {
    const { machine } = this.props;
    return (
      <div>
        <Card style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header style={{ 'fontSize': '5em', 'textAlign': 'left' }}>
              <Icon name='dollar' />
              {this.state.amount}
            </Card.Header>
          </Card.Content>
        </Card>
        <Form onSubmit={this.submitHandler.bind(this)}>
          <Form.Field>
            <label>Amount: </label>
            <Input id='amountInput' name='amountInput' icon='dollar' iconPosition='left' autoComplete="off"/>
          </Form.Field>
          <Form.Field>
            <Button animated='vertical' onClick={this.paymentHandler.bind(this)}>
              <Button.Content hidden>Insert</Button.Content>
              <Button.Content visible>
                <Icon name='money' />
              </Button.Content>
            </Button>
            <Button animated='vertical' onClick={this.clearHandler.bind(this)}>
              <Button.Content hidden>Clear</Button.Content>
              <Button.Content visible>
                <Icon name='remove' />
              </Button.Content>
            </Button>
          </Form.Field>
        </Form>
        <Card style={{ width: '100%' }}>
          <Card.Content>
            <Card.Header style={{ 'fontSize': '1em', 'textAlign': 'left' }}>
              {this.state.message.split('\n').map(function(item, i) {
                return (
                  <span key={i.toString()}>
                    {item}
                    <br/>
                  </span>
                )
              })}
            </Card.Header>
          </Card.Content>
        </Card>
      </div>
    )
  }
}