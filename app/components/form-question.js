import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormQuestionComponent extends Component {

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
    if(event.target == null){
      this.value = event.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value
      this.showInput()
    } else{
     console.log(event.target.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value)
     this.value = event.target.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value
     this.showInput()
    }
    console.log(this.value)
  }

  @action
  focus(element) {
    console.log(this.args.index)
    if(this.args.index == 0) {
    element.focus();
    }
  }

  @tracked optionsEntered = []
  @action
  optionsEnter() {

     // Need @questions and @responses and build list of previously entered responses
     // If @questoins supplied to form-question as attribute?
  }

  get options(){
    let optionString = this.args.question
    // console.log(optionString.options)
    let formTemplates = this.args.formTemplates
    console.log(formTemplates)
    formTemplates.map(function(formTemplate) {

      console.log('formTemplate: ' + formTemplate.title)
        formTemplate.questionTemplates.map(function(questionTemplate){
          console.log('questionTemplate: ' + questionTemplate.question)
        })

    })
    optionString = optionString.options.split(',')

    //console.log('options - recalculated>:' + this.optionsEntered)
    return optionString
  }
}