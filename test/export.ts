import { assert } from 'chai';
const { Core, Payment, Item } = require('../');

describe('Export', () => {
  it('should export Core', () => {
    assert.isDefined(Core);
    assert.isFunction(Core);
    assert.isUndefined(Core.default);
  });

  it('should export Payment', () => {
    assert.isDefined(Payment);
    assert.isObject(Payment);
    assert.isUndefined(Payment.default);
  });

  it('should export Core', () => {
    assert.isDefined(Item);
    assert.isFunction(Item);
    assert.isUndefined(Item.default);
  });

});