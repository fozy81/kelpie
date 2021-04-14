// import config from '../config/environment';
// import PouchDB from 'ember-pouch/pouchdb';
// import { Adapter } from 'ember-pouch';
// import { assert } from '@ember/debug';
// import { isEmpty } from '@ember/utils';
// import { inject as service } from '@ember/service';
// import auth from 'pouchdb-authentication';

// export default class ApplicationAdapter extends Adapter {
//   constructor() {
//     super(...arguments);

//     const localDb = config.local_couch || 'test'

//     assert('local_couch must be set', !isEmpty(localDb));

//     const remote = new PouchDB('http://localhost:5984/test');
//     const db = new PouchDB(localDb);

//   db.sync(remote, {
//     live: true,   // do a live, ongoing sync
//     retry: true   // retry if the connection is lost
//   });
//      this.set('db', db);

//     return this;
//   }

// }

import ENV from 'kelpie/config/environment';
// PouchDB.debug.enable('*');
import config from '../config/environment';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import { Adapter } from 'ember-pouch';
import PouchDB from 'ember-pouch/pouchdb';
import auth from 'pouchdb-authentication';
import pouchInMemoryPlugin from 'pouchdb-adapter-memory';

PouchDB.plugin(auth);

// Run test database in memory to avoid credential timing issue
if (
  config.emberPouch.options &&
  config.emberPouch.options.adapter === 'memory'
) {
  PouchDB.plugin(pouchInMemoryPlugin);
}

// let db = new PouchDB('kelpie');

//  db.sync(remote, {
//     live: true,   // do a live, ongoing sync
//     retry: true   // retry if the connection is lost
//  });

export default class ApplicationAdapter extends Adapter {
  @service session;
  @service cloudState;
  @service refreshIndicator;

  constructor() {
    super(...arguments);

    let db = new PouchDB(ENV.remote_couch);

    // Run test without fetch credentials to avoid timing issue
    if (
      config.emberPouch.options &&
      config.emberPouch.options.adapter === 'memory'
    ) {
      db = new PouchDB(ENV.remote_couch, config.emberPouch.options);
    } else {
      db = new PouchDB(ENV.remote_couch, {
        fetch(url, opts) {
          opts.credentials = 'include';
          return PouchDB.fetch(url, opts);
        },
      });
    }

    db.createIndex({
      index: {
        fields: ['data.createdDateValue'],
      },
    });

    db.createIndex({
      index: {
        fields: ['data.dueDateValue'],
      },
    });

    let local = new PouchDB('kelpie');

    local.sync(db, {
    live: true,   // do a live, ongoing sync
    retry: true   // retry if the connection is lost
 });

    this.db = db;

    return this;
  }
}
