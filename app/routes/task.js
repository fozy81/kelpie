import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { load } from 'kelpie/helpers/unique-forms';
import { inject as service } from '@ember/service'
import ENV from 'kelpie/config/environment';

export default class TasksRoute extends Route {

  @service session;
  beforeModel(){   
    if(!this.session.isAuthenticated && ENV.locationType !== "none") {
        this.replaceWith('login');
    } 
}

  model(params) {
    return RSVP.hash({
      task: this.store.findRecord('task', params.task_id, { include: 'project,taskTemplate.forms,forms.formTemplate,forms.questions.questionTemplate' })
      //,
      //formTemplate: this.store.findAll('form-template', { include: 'questionTemplates' })
      // formTemplate: this.store.findRecord('task', params.task_id, { include: 'forms' }).then(function (task) {       
      //     let templates = task.forms.map(function (form) {
      //       console.log(form)
      //       this.store.findRecord('form-template', form.templateId, { include: 'questionTemplates' })
      //     })  
      //     return templates      
      // })
    });
  }

}