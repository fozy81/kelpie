import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | responses', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:responses');
    assert.ok(route);
  });
});
