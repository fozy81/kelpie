import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Helper | unique-forms', function(hooks) {
  setupRenderingTest(hooks);

  // Replace this with your real tests.
  test.skip('code not used currently - needs weakmap as test data?', async function(assert) {
    this.set('inputValue', '1234');

    await render(hbs`{{unique-forms inputValue}}`);

    assert.equal(this.element.textContent.trim(), '1234');
  });
});
