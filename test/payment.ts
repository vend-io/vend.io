import Payment, { Cash, Card } from '../src/payment';
import { assert } from 'chai';

describe('Payment', () => {
  const payment = new Payment();
  const cash = new Cash();
  const card = new Card('John N. Doe', 123456789, new Date());
  const value = 0.50;
  describe('pay()', () => {
    it('should start a transaction', () => {
      // Card payment
      payment.method = card;
      assert.isTrue(payment.pay(value));

      // Cash payment
      payment.method = cash;
      assert.isTrue(payment.pay(value));

      assert.equal(payment.value, value);
    });
  });

  describe('process()', () => {
    it('should process the transaction', () => {
      payment.method = cash;
      assert.isTrue(payment.process(value));
      assert.equal(payment.change, 0);
      payment.pay(value);
      payment.process(value / 2);
      assert.equal(payment.change, value / 2);
    });
  });
});