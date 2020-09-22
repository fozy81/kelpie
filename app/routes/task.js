import Route from '@ember/routing/route';
import RSVP from 'rsvp';

export default class TasksRoute extends Route {

  model(params) {
    return RSVP.hash({
     task: this.store.findRecord('task', params.task_id, { include: 'project,forms.responses' }),
      form: this.store.findAll('form-template', { include: 'questionTemplates' })
    });    
  }
 
}