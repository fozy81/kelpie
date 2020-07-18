import config from '../config/environment';
import PouchDB from 'ember-pouch/pouchdb';
import { Adapter } from 'ember-pouch';
import { assert } from '@ember/debug';
import { isEmpty } from '@ember/utils';
import { inject as service } from '@ember/service';
import auth from 'pouchdb-authentication';

export default class ApplicationAdapter extends Adapter {
  constructor() {
    super(...arguments);

    const localDb = config.local_couch || 'test'

    assert('local_couch must be set', !isEmpty(localDb));

  //  const remote = 'http://localhost:5984/test'

    const db = new PouchDB(localDb);
    

    
  
  
//  db.sync(remote, {
//    live: true,   // do a live, ongoing sync
//    retry: true   // retry if the connection is lost
//  });
     this.set('db', db);

    return this;
  }    
  
}  
