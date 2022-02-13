import ENV from 'kelpie/config/environment';
import config from '../config/environment';
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

export default class ApplicationAdapter extends Adapter {
  @service session;
  @service cloudState;
  @service refreshIndicator;
  @service store;

  constructor() {
    super(...arguments);

    // If not authenticated, then don't use local db?
    console.log('session: ' + this.session.isAuthenticated);

    // Run test without fetch credentials to avoid timing issue
    // if (
    //   config.emberPouch.options &&
    //   config.emberPouch.options.adapter === 'memory'
    // ) {
    //   remote = new PouchDB(ENV.remote_couch, config.emberPouch.options);
    // } else {
    //   remote = new PouchDB(ENV.remote_couch, {
    //     fetch(url, opts) {
    //       opts.credentials = 'include';
    //       return PouchDB.fetch(url, opts);
    //     },
    //   });
    // }

    let local = new PouchDB('kelpie');

    local.createIndex({
      index: {
        fields: ['data.createdDateValue'],
      },
    });

    local.createIndex({
      index: {
        fields: ['data.dueDateValue'],
      },
    });

    local.createIndex({
      index: {
        fields: ['data.title'],
      },
    });

    local.createIndex({
      index: {
        fields: ['data.containerId'],
      },
    });

    if (this.session.isAuthenticated) {
      let remote = new PouchDB(ENV.remote_couch);
      // Run test without fetch credentials to avoid timing issue
      if (
        config.emberPouch.options &&
        config.emberPouch.options.adapter === 'memory'
      ) {
        remote = new PouchDB(ENV.remote_couch, config.emberPouch.options);
      } else {
        remote = new PouchDB(ENV.remote_couch, {
          fetch(url, opts) {
            opts.credentials = 'include';
            return PouchDB.fetch(url, opts);
          },
        });
      }

      var url = ENV.remote_couch;

      remote.createIndex({
        index: {
          fields: ['data.createdDateValue'],
        },
      });

      remote.createIndex({
        index: {
          fields: ['data.dueDateValue'],
        },
      });

      remote.createIndex({
        index: {
          fields: ['data.title'],
        },
      });

      remote.createIndex({
        index: {
          fields: ['data.containerId'],
        },
      });

      const replicationOptions = {
        live: true,
        retry: true,
      };

      local.replicate.from(url, replicationOptions).on('paused', (err) => {
        this.cloudState.setPull(!err);
      });

      local.replicate
        .to(url, replicationOptions)
        .on('denied', (err) => {
          if (!err.id.startsWith('_design/')) {
            //there was an error pushing, probably logged out outside of this app (couch/cloudant dashboard)
            this.session.invalidate(); //this cancels the replication

            throw { message: 'Replication failed. Check login?' }; //prevent doc from being marked replicated
          }
        })
        .on('paused', (err) => {
          this.cloudState.setPush(!err);
        })
        .on('error', () => {
          this.session.invalidate(); //mark error by loggin out
        });
    }

    this.db = local;

    return this;
  }

  unloadedDocumentChanged(obj) {
    this.refreshIndicator.kickSpin();

    let store = this.store;
    let recordTypeName = this.getRecordTypeName(store.modelFor(obj.type));
    this.db.rel.find(recordTypeName, obj.id).then(function (doc) {
      store.pushPayload(recordTypeName, doc);
    });
  }
}
