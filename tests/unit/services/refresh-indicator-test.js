import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | refresh-indicator', function (hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function (assert) {
    let service = this.owner.lookup('service:refresh-indicator');
    assert.ok(service);
  });
});
