import { module, test } from 'qunit';
import { visit, currentURL, fillIn, click, settled} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login', function(hooks) {
  setupApplicationTest(hooks);

  test('visiting /login', async function(assert) {
  
    await visit('/login');
    await fillIn('.identification', 'test');
    await fillIn('.password', 'test');    
    await click('.login');   
    await visit('/projects');
    assert.equal(currentURL(), '/projects');
  });
});
