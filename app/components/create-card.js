import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class CreateCardComponent extends Component {

  @action
  focus(element) {
    element.focus();
  }

  @tracked show = false;
  @action
  showCard() {

    this.show = !this.show

  }

  @tracked newName;
  @service router;
  @service store;
  @action
  createCard() {
    const router = this.router
    let model = null
    if (this.args.modelName == null) {
      model = router.currentRoute.attributes.modelName
    } else {
      model = this.args.modelName
    }
    if (model == "project") {
      this.store.createRecord(model, {
        title: this.newName
      }).save().then(function (record) {
        const path = '/' + router.currentRoute.name + '/' + record.id
        router.transitionTo(path);
      })
    }
    if (model == "task") {
      const id = router.currentRoute.params.project_id
      let myProject = this.store.peekRecord('project', id);
      let task = this.store.createRecord(model, {
        title: this.newName,
        project: myProject
      })

      let self = this;

      function transitionToTask(task) {
        router.transitionTo('/task/' + task.id);
      }

      function failure(reason) {
        console.log(reason) // handle the error
      }

      task
        .save()
        .then(transitionToTask)
        .catch(failure);
    }

    if (model == "form") {
      const store = this.store 
      const newName = this.newName
      const id = router.currentRoute.params.task_id
      function failure(reason) {
        console.log(reason) // handle the error
      }

      let myTask = store.peekRecord('task', id);
      let formTemplate = store.createRecord('form-template', {
        title: this.newName      
      })
      formTemplate
        .save()
        .then(addForm)
        .catch(failure);

      function addForm(formTemplate) {
        // add form template to form record
        let form = store.createRecord(model, {
          title: newName,
          task: myTask,
          rep: 1,
          edit: true,
          templateId: formTemplate.id
        })
        form
          .save()
          .catch(failure);
      }
      this.show = !this.show
    }

    this.newName = ""
  }


  @action
  addFormTemplate(id) {
    const router = this.router
    const store = this.store
    const taskId = router.currentRoute.params.task_id
    let myTask = store.peekRecord('task', taskId);
    let formTemplate = store.peekRecord('form-template', id);
    console.log('templateID: ' + formTemplate.questionTemplates)
    let formRecord = store.createRecord('form', {
      title: formTemplate.title,
      description: formTemplate.description,
      rep: 1,
      edit: false,     
      templateId: formTemplate.id,
      task: myTask
    }
    )
    formRecord.save().then(function(form) {
      console.log(form.templateId)
      let questionTemplates = formTemplate.questionTemplates      
      let myForm = store.peekRecord('form', form.id);
      questionTemplates.map(function(questionTemplate) {
        console.log('question: ' + questionTemplate.question)
        let question = store.createRecord('question', {
          question: questionTemplate.question,
          response: questionTemplate.response,
          rep: 1,
          multiEntry: questionTemplate.multiEntry,
          type: questionTemplate.type,
          form: myForm
        })
        question.save()
      })
    })


    this.show = !this.show
  }
}