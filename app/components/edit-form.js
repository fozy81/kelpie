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

  @tracked selectedOptions = [];
  @action
  formChange(event) {

    let selection = { id: event.target.id, value: event.target.value }   
    if (this.selectedOptions.length === 0 ) {
      this.selectedOptions.push(selection)
    } else {
      // eslint-disable-next-line no-inner-declarations
      function changeDesc(value, id, selectedOptions) {
        let found = false
        for (var i = 0; i < selectedOptions.length; i++) {
          if (selectedOptions[i].id === id) {
            selectedOptions[i].value = value;
            //break; Stop this loop, we found it!
            found += true
          }
        }

        if (found === false) {
          selectedOptions = selectedOptions.push(selection)
        }
        return selectedOptions
      }
      let selectedOptions = this.selectedOptions
      let options = changeDesc(event.target.value, event.target.id, selectedOptions);
      this.selectedOptions = selectedOptions

    }
          console.log(this.selectedOptions)
        
  }

  @service router;
  @action
  saveReplaceForm(event) {
    event.preventDefault()
    let store = this.store
    let args = this.args
    let router = this.router
    let selectedOptions = this.selectedOptions
    //save form template
    let formTemplateId = this.args.formTemplate.id
    store.findRecord('form-template', formTemplateId).then(
      function (formTemplate) {
      // convert checkbox string to boolean
      
      if(formTemplate.multiEntry === 'true' | formTemplate.multiEntry === true) {
        formTemplate.multiEntry = true
      } else {
        formTemplate.multiEntry = false
      }
      console.log('multientry: ' + formTemplate.multiEntry)
      formTemplate.save().then(function(formTemplates) {

      // For question type 'dropdown' select options:
     let questionTemplates = formTemplates.questionTemplates;
        questionTemplates.map(function(question, index) {
       console.log(question.id)
        store.findRecord('question-template', question.id).then( 
        function(questionTemplate) {
          console.log('questiontemplate: ' + questionTemplate.question)
          questionTemplate.type = selectedOptions[index].value
          
          questionTemplate.save()
        })
       
     })
    })
    }).then(function() {
      let formId  = args.forms.id
    
      let form = store.peekRecord('form', formId);
      form.destroyRecord();
      // add new form
      const taskId = router.currentRoute.params.task_id
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
          console.log('type: ' + questionTemplate.type)
          let question = store.createRecord('question', {
            question: questionTemplate.question,
            response: '',
            rep: 1,
            multiEntry: questionTemplate.multiEntry,
            type: questionTemplate.type,
            form: myForm
          })
          question.save()
        })
      })
    })   
     

    // remove existing formlet questionTemplates = formTemplate.questionTemplates 
    
  

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

  @tracked showField = '';
  @action
  showInput(index) {
        this.showField = index    
        console.log(this.showField)
  }
}
