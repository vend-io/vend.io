import { assert } from 'chai';
import Option from '../src/options';

describe('Option', () => {
  it('should mutate a property', () => {
    const options = new Option({ debug: true });
    assert.isDefined(options.defaults);
    assert.isObject(options.defaults);
    assert.notEqual(options.defaults.debug, options.debug);
    assert.isFalse(options.defaults.debug);
    assert.isTrue(options.debug);
  });

  it('should mutate a nested property', () => {
    const options = new Option({ ui: { rows: 2 } });
    assert.notDeepEqual(options.defaults.ui, options.ui);
    assert.deepEqual(options.ui, {
      rows: 2,
      columns: options.defaults.ui.columns
    });
  });
});