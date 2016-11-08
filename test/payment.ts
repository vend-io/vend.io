import Payment from '../src/payment';
import { Cash, Card } from '../src/payment';
import { assert } from 'chai';

describe('Payment', () => {
  const payment = new Payment();
  const cash = new Cash();
  const card = new Card('John N. Doe', 123456789, new Date());
  describe('pay()', () => {
    it('should start a transaction', () => {
      const value = 0.50;
      payment.method = card;

      assert.isTrue(payment.pay(value));

      payment.method = cash;

      assert.isTrue(payment.pay(value));

      assert.equal(payment.value, value);
    });
  });

  describe('process()', () => {
    it('should process the transaction', () => {
      assert.isTrue(payment.process());
    });
  });
});