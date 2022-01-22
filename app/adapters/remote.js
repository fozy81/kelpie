import ApplicationAdapter from './application';
import ENV from 'kelpie/config/environment';
// PouchDB.debug.enable('*');
import { inject as service } from '@ember/service';
import PouchDB from 'ember-pouch/pouchdb';
import auth from 'pouchdb-authentication';


PouchDB.plugin(auth);

export default class RemoteAdapter extends ApplicationAdapter {
  @service session;
  @service cloudState;
  @service refreshIndicator;

  constructor() {
    super(...arguments);

    let remote = new PouchDB(ENV.remote_couch, {
      fetch(url, opts) {
        opts.credentials = 'include';
        return PouchDB.fetch(url, opts);
      },
    });

    this.db = remote;

    return this;
  }
}
