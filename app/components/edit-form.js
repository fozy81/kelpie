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

  @action
  saveQuestion() {
    // save new/added questions?
    // pass in new questions?
  }


  @tracked count = 0
  @action
  addQuestion() {
    // this.count += 1
    let formTemplateId = this.args.formTemplate.id
    console.log(formTemplateId)
    let formTemplate = this.store.peekRecord('form-template', formTemplateId)
    let newQuestion = this.store.createRecord('question-template', {
      question: '',
      type: '',
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
