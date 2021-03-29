import Route from '@ember/routing/route';
import { inject as service } from '@ember/service'

export default class ProjectRoute extends Route {


    @service session;
    beforeModel(){
        if(!this.session.isAuthenticated) {
            this.replaceWith('login');
        }
    }


    model(params){
        return this.store.findRecord('project',  params.project_id, { include: 'tasks.forms.questions,projectTemplate,tasks.taskTemplate'});  

    }
}
