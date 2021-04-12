import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ResponsesRoute extends Route {
  @service session;
  beforeModel() {
    if (!this.session.isAuthenticated) {
      this.replaceWith('login');
    }
  }

  model() {
    return this.store.findAll('project', { include: 'tasks,forms.questions' });
  }

  //     model() {
  //         return this.store.query('project',  {
  //            selector: {

  //   //           //,
  //   //           //'tasks.title': { '$eq': 'Test'}
  //   //            "$or": [
  //   //   { "title": { "$eq": "W"}},
  //   //    {"description": { "$eq": "badger"}}
  //   // ]
  //   //       },
  //   //         limit: 100
  //   //       });
  //   //     }

  //     filter: { id: { '$gte': null }
  //           },
  //     limit: 1000
  //         }
  //   })

  // }
}
