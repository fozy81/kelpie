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
    console.log('selection:' + selection) 
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
          console.log(this.selectedOptions[0].value)
        
        
  }

  @service router;
  @action
  saveReplaceForm(event) { 
    console.log('saveReplaceForm: ')
    // event.preventDefault()
    let store = this.store
    let args = this.args
    let router = this.router
    let selectedOptions = this.selectedOptions
    //save form template
    let formTemplateId = this.args.formTemplate.id
    store.findRecord('form-template', formTemplateId, { include: 'questionTemplates' }).then(
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
          console.log('question map')    
        store.findRecord('question-template', question.id).then( 
        function(questionTemplate) {
         // console.log('selectedOptions: ' + selectedOptions[index].value )
          if(selectedOptions.length === 0) {
            questionTemplate.type = "text"      
          } else {
            questionTemplate.type = selectedOptions[index].value   
          }
          questionTemplate.response = ''                 
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
        dateCreated: new Date(),
        templateId: formTemplate.id,
        task: myTask,
        display: false
      }
      )
      formRecord.save().then(function(form) {
        console.log(form.templateId)
        let questionTemplates = formTemplate.questionTemplates      
        let myForm = store.peekRecord('form', form.id);
        questionTemplates.map(function(questionTemplate) {
          console.log('question: ' + questionTemplate.question)
          console.log('multi-entry? : ' + myForm.multiEntry) 
          let response = ''
             if(questionTemplate.default) {
              response = questionTemplate.default
             }            
          let question = store.createRecord('question', {
            question: questionTemplate.question,
            response: response,
            rep: 1,
            multiEntry: myForm.multiEntry,
            type: questionTemplate.type,
            pos: questionTemplate.pos,
            options: questionTemplate.options,
            required: questionTemplate.required,
            min: questionTemplate.min,
            max: questionTemplate.max,
            step: questionTemplate.step,
            default: questionTemplate.default,
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

  @tracked showthis = false
  @tracked count = 0
  @action
  addQuestion() {
    let formTemplateId = this.args.formTemplate.id
    console.log(formTemplateId)
    let formTemplate = this.store.peekRecord('form-template', formTemplateId)    
    let questions = formTemplate.questionTemplates    
    let position = questions.length + 1
    
    let newQuestion = this.store.createRecord('question-template', {
      multiEntry: false,
      pos: position,
      formTemplate: formTemplate      
    })

    
    newQuestion.save().then(console.log('question?' + newQuestion.question))
    this.showthis = true
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

  @action
  removeFormTemplate(id){
 
   console.log('remove question!' + id)
 
   let form = this.store.peekRecord('form-template', id);
   console.log('remove question!' + form)
   if(form.archive === true) {
    form.archive = false
   } else {
   form.archive = true
   }
   form.save()
   this.args.edit()
  }



  
}
