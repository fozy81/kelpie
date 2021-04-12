import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | edit-method', function (hooks) {
  setupRenderingTest(hooks);

  test.todo('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<EditMethod />`);

    //assert.equal(this.element.textContent.trim(), '');
    assert.dom('.title').exists();
    // Template block usage:
    await render(hbs`
      <EditMethod>
        
      </EditMethod>
    `);

    assert.dom('.title').exists();
    //assert.equal(this.element.textContent.trim(), '');
  });
});
