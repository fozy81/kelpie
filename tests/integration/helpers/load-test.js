import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | load', function (hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test.skip('code not used currently - needs weakmap value?', async function (assert) {
    const wm1 = new WeakMap();
    const o1 = '34';
    wm1.set(o1, 37);
    await render(hbs`{{load this.wm1}}`);

    assert.equal(this.element.textContent.trim(), '1234');
  });
});
