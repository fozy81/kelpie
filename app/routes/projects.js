import Route from '@ember/routing/route';

export default class ProjectsRoute extends Route {

    // model(){
    //     return this.store.findAll('project');
    // }


    model() {
        return this.store.query('project',  {
          filter: { title: { '$gte': null },
                    projectId: { '$gte': null }
                },
          limit: 20
        })
    }
 
      

    
}
