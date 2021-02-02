import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'

export default class FormQuestionComponent extends Component {

  @service store
  @tracked showField = true;
  @action
  showInput() {

    this.showField = !this.showField
    console.log('showField: ' + this.showField)

  }

  @action
  save(event) {
    this.args.addSelections(event)
    this.showInput()

  }

  get displayValue() {
    return this.args.value
  }


  @tracked value = this.args.value;
  @action
  cancel(event) {
    console.log(event)
    if (event.target == null) {
      this.value = event.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value
      this.showInput()
    } else {
      console.log(event.target.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value)
      this.value = event.target.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value
      this.showInput()
    }
    console.log(this.value)
  }

  @action
  focus(element) {
    console.log(this.args.index)
    if (this.args.index == 0) {
      element.focus();
    }
  }

  @tracked optionsEntered = []
  @action
  optionsEnter() {

    // Need @questions and @responses and build list of previously entered responses
    // If @questoins supplied to form-question as attribute?
  }



  get options() {
    let id = this.args.question.questionTemplateId

    let questionTemplates = this.store.peekRecord('question-template', id)
    // let questionTemplates = this.args.questionTemplates
    console.log('questionTemplates: ' + questionTemplates)
    let form = this.args.form
    let store = this.store
    let responses = []
    // find all responses from task
    id = form.templateId
    console.log('id: ' + form.templateId)

    let task = store.peekRecord('task', form.templateId)
    console.log('task: ' + task)
    task.forms.map(function (form) {
      if (form.templateId === id) {
        form.questions.map(function (question) {
          if (question.id) {
            let q = store.peekRecord('question', question.id)
            responses.push(q.response)
          }
        })
      }
    })

    console.log('responses' + responses)
    //let templateOptions = []
    // find options from questionTemplate
    // questionTemplates.map(function (questionTemplate) {     
    //   if (questionTemplate.id == id) {
    //     questionTemplate.options.split(',').map(function (item) {
    //       templateOptions.push(item)
    //     })
    //   }
    // })
    
    let templateOptions = questionTemplates.options.split(',')

  
    // filter out options which have already been given as a reponse in this task
    templateOptions = templateOptions.filter(function (item) {
      return !responses.includes(item);
    })   

    return templateOptions
  }
}