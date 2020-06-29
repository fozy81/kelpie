import Route from '@ember/routing/route';

export default class ProjectRoute extends Route {

    model(params){
        return this.store.findRecord('project',  params.project_id, { include: 'tasks,forms.responses'});
    }
}
