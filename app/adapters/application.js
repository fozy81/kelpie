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

PouchDB.plugin(auth);





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

    const db = new PouchDB(ENV.remote_couch,
       {ajax: {rejectUnauthorized: false,
        requestCert: true,
        agent: false}     
      
      });

    db.createIndex({
      index: {
        fields: ['data.createdDateValue']
      }
    })

    db.createIndex({
      index: {
        fields: ['data.dueDateValue']
      }
    })

    this.db = db;


    return this;
  }


}