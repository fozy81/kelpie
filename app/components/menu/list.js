import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class MenuListComponent extends Component {


  @action
  showingArchive() {
    console.log('show archive')
    this.args.showArchive()
    
  }

  @tracked show = true;
  @action
  hideMenuList() {
    this.show = false
  }

  @tracked count = 1;
  @action
  removeMenuList() {
    if (this.count > 1) {
      this.show = false
    }
    this.count += 1
  }

  @service store
  @service router
  @action
  removeProject() {

    const id = this.router.currentRoute.params.project_id
    console.log(id)
    let project = this.store.peekRecord('project', id);
    console.log(project)
    project.destroyRecord()
    const path = '/projects'
    this.router.transitionTo(path);

  }

  @action
  removeTask() {

    const id = this.router.currentRoute.params.task_id
    let task = this.store.peekRecord('task', id, {
      include: 'project'
    })

    task.destroyRecord()
    const projectId = this.args.id
    const path = '/projects/' + projectId
    this.router.transitionTo(path);

  }

  @action
  removeForm() {
    const id = this.args.id
    let form = this.store.peekRecord('form', id, {
      include: 'form.questions'
    })

    form.questions.map(function (question) {
      question.archive = true
      question.save()
    })
    form.archive = true
    let date = new Date()
    form.modifiedDate = date
    form.modifiedDateValue = date.valueOf()
    form.save()
  }

  @action
  removeAllForms() {
    const form = this.args.model
    const templateId = form.formTemplateId
    const id = this.router.currentRoute.params.task_id
    let task = this.store.peekRecord('task', id, {
      include: 'forms'
    })

    task.forms.map(function (form) {
      if (form.formTemplateId == templateId) {
        form.questions.map(function(question){
         question.archive = true
         question.save()
        })
        form.archive = true
        let date = new Date()
        form.modifiedDate = date
        form.modifiedDateValue = date.valueOf
        form.save()
      }
    })
  }

}
