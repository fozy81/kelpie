import Route from '@ember/routing/route';

export default class ResponsesRoute extends Route {

    // model(){
    //     return this.store.findAll('project', { include: 'tasks,forms.questions' });


    // }

    model() {
        return this.store.query('project',  {        
          filter: { 
            'startDate': { '$gte': null }
            //,
            //'tasks.title': { '$eq': 'Test'}
        },
          limit: 100
        });
      }
}
