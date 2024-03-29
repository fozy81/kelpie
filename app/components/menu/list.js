import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class MenuListComponent extends Component {
  @action
  showingArchive() {
    console.log('show archive');
    this.args.showArchive();
  }

  @action
  showPrint() {
    console.log('show print');
    this.args.showPrint();
  }

  @tracked show = true;
  @action
  hideMenuList() {
    this.show = false;
  }

  @tracked count = 1;
  @action
  removeMenuList() {
    if (this.count > 1) {
      this.show = false;
    }
    this.count += 1;
  }

  @service store;
  @service router;
  @action
  removeProject() {
    const id = this.router.currentRoute.params.project_id;
    let project = this.store.peekRecord('project', id, {
      include: 'tasks.forms.questions',
    });
    let date = new Date();
    project.modifiedDate = date;
    project.modifiedDateValue = date.valueOf();
    project.archive = true;
    project.save().then(function () {
      project.tasks.map(function (task) {
        task.archive = true;
        task.save().then(function (task) {
          task.forms.map(function (form) {
            form.archive = true;
            form.save().then(function (form) {
              form.questions.map(function (question) {
                question.archive = true;
                question.save();
              });
            });
          });
        });
      });
    });
    const path = '/projects';
    this.router.transitionTo(path);
  }

  @action
  removeTask() {
    const id = this.router.currentRoute.params.task_id;
    let task = this.store.peekRecord('task', id, {
      include: 'project, task.forms.questions',
    });
    task.archive = true;
    let date = new Date();
    task.modifiedDate = date;
    task.modifiedDateValue = date.valueOf();
    task.save().then(function (task) {
      task.forms.map(function (form) {
        form.archive = true;
        form.save().then(function (form) {
          form.questions.map(function (question) {
            question.archive = true;
            question.save();
          });
        });
      });
    });
    const projectId = this.args.id;
    const path = '/projects/' + projectId;
    this.router.transitionTo(path);
  }

  @action
  removeForm() {
    const id = this.args.id;
    let form = this.store.peekRecord('form', id, {
      include: 'form.questions',
    });

    form.questions.map(function (question) {
      question.archive = true;
      question.save();
    });
    form.archive = true;
    let date = new Date();
    form.modifiedDate = date;
    form.modifiedDateValue = date.valueOf();
    form.save();
  }

  @action
  removeAllForms() {
    const form = this.args.model;
    const templateId = form.formTemplateId;
    // const id = this.router.currentRoute.params.task_id;
    const containId = form.get('templateId');
    console.log('form container: ' + containId);
    console.log('form templateId: ' + templateId);
    let task = this.store.peekRecord('container', containId, {
      include: 'forms',
    });

    task.forms.map(function (form) {
      console.log(form.archive);
      if (form.formTemplateId == templateId) {
        form.questions.map(function (question) {
          question.archive = true;
          question.save();
        });
        form.archive = true;
        let date = new Date();
        form.modifiedDate = date;
        form.modifiedDateValue = date.valueOf;
        form.save();
      }
    });
  }
}
