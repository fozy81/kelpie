import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | secret', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:secret');
    assert.ok(route);
  });
});
