import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import PouchDB from 'ember-pouch/pouchdb';

export default class LoginController extends Controller {
  @service session;
  @service router;
  @service store;

  @tracked error;
  @tracked password;
  @tracked identification;
  @tracked user = this.session.data.authenticated.name;
  @tracked roles = this.session.data.authenticated.roles;

  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:pouch',
        this.identification,
        this.password
      );
    } catch (error) {
      this.error = error.reason || error;
    }
  }

  @action
  async signup(event) {
    event.preventDefault();
    try {
      await this.session.authenticate(
        'authenticator:pouch',
        this.identification,
        this.password
      );
    } catch (error) {
      this.error = error.reason || error;
    }
  }

  @action
  async changePassword(event) {
    event.preventDefault();
    console.log('change password');
    return;
    // try {
    //   await this.session
    //     .authenticate('authenticator:pouch', this.identification, this.password)
    //     .then(function () {
    //       window.location.reload();
    //     });
    // } catch (error) {
    //   this.error = error.reason || error;
    // }
  }

  @action
  updateIdentification(e) {
    this.identification = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }

  @action
  newId(e) {
    this.new = e.target.value;
  }

  @action
  invalidateSession() {
    this.session.invalidate();
  }

  @action
  changedb() {
    let store = this.store;
    let remote = new PouchDB('http://localhost:5984/project');
    remote.login('test', 'test').then(function () {
      let db = new PouchDB('project');
      db.sync(remote, { live: true, retry: true });
      // grab the adapter, it can be any ember-pouch adapter.
      let adapter = store.adapterFor('application');
      // this is where we told the adapter to change the current database.
      adapter.changeDb(db);
    });
  }
}
