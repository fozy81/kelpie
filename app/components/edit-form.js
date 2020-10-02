import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class EditFormComponent extends Component {

  @service store
  @action
  saveForm() {
    event.preventDefault()
    console.log(this.args.forms)
    let formTemplateId = this.args.formTemplate.id
    this.store.findRecord('form-template', formTemplateId).then(function (formTemplate) {
      formTemplate.save();
    })   

    // stop showing edit menu
    this.args.edit()
  }

  @service router;
  @action
  saveReplaceForm() {
    event.preventDefault()
    let store = this.store
    //save form template
    let formTemplateId = this.args.formTemplate.id
    store.findRecord('form-template', formTemplateId).then(function (formTemplate) {
      if(formTemplate.multiEntry === 'true') {
        formTemplate.multiEntry = true
      } else {
        formTemplate.multiEntry = false
      }
      formTemplate.save();
    })   
    // update remove existing form?
    let formId  = this.args.forms.id
    
    let form = store.peekRecord('form', formId);
    form.destroyRecord();
    // add new form?
    const taskId = this.router.currentRoute.params.task_id
    console.log(taskId)
    let myTask = store.peekRecord('task', taskId);
    let formTemplate = store.peekRecord('form-template', formTemplateId);
    let formRecord = store.createRecord('form', {
      title: formTemplate.title,
      description: formTemplate.description,
      rep: 1,
      edit: false, 
      multiEntry: formTemplate.multiEntry,    
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
  

    // stop showing edit menu
    //this.args.edit()
  }


  @tracked count = 0
  @action
  addQuestion() {
    // this.count += 1
    let formTemplateId = this.args.formTemplate.id
    console.log(formTemplateId)
    let formTemplate = this.store.peekRecord('form-template', formTemplateId)
    let newQuestion = this.store.createRecord('question-template', {
      multiEntry: false,
      formTemplate: formTemplate
    })

    
    newQuestion.save().then(console.log(newQuestion.question))
  }

  @action
  focus(element) {
    element.focus();
  }
}
