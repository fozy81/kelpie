import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | search-projects', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });

    await render(hbs`<SearchProjects />`);

    assert.dom('.search-projects').exists();

    // Template block usage:
    await render(hbs`
      <SearchProjects>
        template block text
      </SearchProjects>
    `);

    assert.dom('.search-projects').exists();
  });
});
