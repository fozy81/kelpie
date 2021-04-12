import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<Table @responses='test' />`);
    assert.dom('.table').exists();

    // Template block usage:
    await render(hbs`
      <Table>
        template block text
      </Table>
    `);

    assert.dom('.table').exists();
  });
});
