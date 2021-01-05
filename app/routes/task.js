import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { load } from 'kelpie/helpers/unique-forms';

export default class TasksRoute extends Route {

  model(params) {
    return RSVP.hash({
     task: this.store.findRecord('task', params.task_id, { include: 'project,forms.questions.responses' }),
     formTemplate: this.store.findAll('form-template', { include: 'questionTemplates' })
    });    
  } 
 
}