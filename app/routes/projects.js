import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class ProjectsRoute extends Route {

    @service session;
    beforeModel(){
        if(!this.session.isAuthenticated) {
            this.replaceWith('login');
        }
    }


    model() {
        return this.store.query('project',  {
          filter: { title: { '$gte': null },
                    projectId: { '$gte': null }
                },
          limit: 20
        })
    }

    
}
