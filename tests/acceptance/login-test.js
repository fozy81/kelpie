import { module, test } from 'qunit';
import {
  visit,
  currentURL,
  fillIn,
  click,
  settled,
  waitFor,
  waitUntil,
  throws,
  pauseTest,
} from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | login', function (hooks) {
  setupApplicationTest(hooks);

  // test('wrong password and username /login', async function(assert) {

  // await visit('/');
  // assert.equal(currentURL(), '/login', 'should redirect automatically');
  // await fillIn('.identification', 'saesef');
  // await fillIn('.password', 'sefsef');
  // await click('.login');
  //  // await waitFor('.error', { timeout: 2000 })
  //  //  assert.dom('.error').exists();
  // });

  test('visiting /login', async function (assert) {
    await visit('/');
    assert.equal(currentURL(), '/login', 'should redirect automatically');
    // await fillIn('.identification', 'test');
    // await fillIn('.password', 'test');
    // await click('.login');
    // // await waitUntil(function() {
    // //   return currentURL('/login')
    // //   }, { timeout: 2000 })
    // await visit('/login');
    // await visit('/projects');
    // await click('.add');
    // assert.equal(currentURL(), '/projects');
  });
});
