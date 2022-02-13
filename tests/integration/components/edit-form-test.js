import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | edit-form', function (hooks) {
  setupRenderingTest(hooks);

  test.skip('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<EditForm />`);

    assert
      .dom(this.element)
      .hasText(
        'Editing Form Template... Archive Title Description Mutli-entry form Add Question Save Form Save & Replace Form Cancel'
      );

    // Template block usage:
    await render(hbs`
      <EditForm>
        
      </EditForm>
    `);

    assert
      .dom(this.element)
      .hasText(
        'Editing Form Template... Archive Title Description Mutli-entry form Add Question Save Form Save & Replace Form Cancel'
      );
  });
});
