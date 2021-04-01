import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | edit-question', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<EditQuestion />`);

    assert.dom('.edit-question').exists();

    // Template block usage:
    await render(hbs`
      <EditQuestion>
        template block text
      </EditQuestion>
    `);

    assert.dom('.edit-question').exists();
  });
});
