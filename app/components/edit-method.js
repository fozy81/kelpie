import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EditMethodComponent extends Component {
  @service store;
  @action
  saveMethod(id) {
    let method = this.store.peekRecord('method', id);
    method.save();
  }
  @service router;
  @action
  saveAdd(id) {
    this.saveMethod(id);
    let store = this.store;
    const taskId = this.router.currentRoute.params.task_id;
    let task = this.store.peekRecord('task', taskId);
    let method = this.store.peekRecord('method', id);
    method.formTemplates.map(function (formTemplate) {
      store
        .findRecord('form-template', formTemplate.id, {
          include: 'questionsTemplate',
        })
        .then(function (formTemplate) {
          store
            .createRecord('form', {
              title: formTemplate.title,
              description: '',
              task: task,
              edit: false,
              multiEntry: false,
              dateCreated: new Date(),
              archive: false,
              formTemplateId: formTemplate.id,
              templateId: task.id,
              formTemplate: formTemplate,
              question: formTemplate.questionsTemplate,
            })
            .save();
        });
    });
  }

  // @action
  // addFormTemplate() {
  //   let methodId = this.args.method.id
  //   console.log(methodId)
  //   let method = this.store.peekRecord('method', methodId)
  //   let formTemplates = method.formTemplates
  //   let position = formTemplates.length + 1

  //   let newQuestion = this.store.createRecord('question-template', {
  //     multiEntry: false,
  //     pos: position,
  //     formTemplate: formTemplate
  //   })

  //   newQuestion.save().then(console.log('question?' + newQuestion.question))
  //   this.showthis = true
  // }
}
