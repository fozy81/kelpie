import Route from '@ember/routing/route';
import RSVP from 'rsvp';
import { load } from 'kelpie/helpers/unique-forms';

export default class TasksRoute extends Route {

  model(params) {
    return RSVP.hash({
      task: this.store.findRecord('task', params.task_id, { include: 'project,forms.questions' }),
      formTemplate: this.store.findAll('form-template', { include: 'questionTemplates' })
      // formTemplate: this.store.findRecord('task', params.task_id, { include: 'forms' }).then(
      //   function (task) {
      //     let forms = task.forms
      //     console.log('model task route' + forms)
      //     let templates = forms.map(function (form) {
      //       console.log('model task route templateId' + form.templateId)
            
      //     })
      //     console.log('model task route templates:' + templates)
      //     return templates
      //   }
      // )
    });
  }

}