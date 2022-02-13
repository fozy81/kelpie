import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import RSVP from 'rsvp';
import ENV from 'kelpie/config/environment';

export default class TasksRoute extends Route {
  // @service session;
  // beforeModel() {
  //   if (!this.session.isAuthenticated && ENV.locationType !== 'none') {
  //     this.replaceWith('login');
  //   }
  // }

  model(params) {
    return RSVP.hash({
      task: this.store.findRecord('task', params.task_id, {
        include:
          'project,taskTemplate,containers,containers.forms.questions.questionTemplate,containers.forms.formTemplate.containerTemplate,containers.forms.container',
      }),

      // .query('project', {
      //   filter: { task_id: { $gte: null }, mainTaskId: { $gte: null } },
      //   limit: 20,
      // })

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
  // @service store;
  // model(params) {
  //   let id = params.task_id;
  //   console.log(id);
  //   let item = this.store
  //     .query('task', {
  //       filter: {
  //         id: id,
  //       },
  //     })
  //     .then(function (tasks) {
  //       let templates = tasks.map(function (task) {
  //         console.log(task.id);
  //         return this.store.findRecord('task', task.id);
  //       });
  //       return templates;
  //     });
  //   return item;
  // }
}
