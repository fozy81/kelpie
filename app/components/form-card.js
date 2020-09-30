import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class CounterComponent extends Component {

  @tracked edit = false;

  @service store;
  @action
  editForm(){ 
     let id = this.args.model.id
     this.store.findRecord('form', id).then(function(form) {
     form.edit = !form.edit;
     form.save()
  }) 

  }

  @tracked shows = false;
  @action
  showQuestion() {
    event.preventDefault()
    this.shows = !this.shows
    console.log("show: " + this.shows)

  }

  question;
  @service store;
  @action
  addQuestion(id) {
    console.log(id)
    event.preventDefault()
    let newQuestion = this.question
    console.log(newQuestion)
    let myForm = this.store.peekRecord('form', id)
    let response = this.store.createRecord('question', {
      question: newQuestion,
      form: myForm
    });
    response.save();
  }


  @action
  submit(event) {
    event.preventDefault();
    console.log(event)
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

  @action
  addSelections(event) {   
    event.preventDefault();   
    console.log(this.formElement.childNodes)
    
    console.log(this.selectedOptions)
    let selectedOptions = this.selectedOptions
    console.log("save data")
    console.log(event.target.attributes.formid.value)
    let formid = event.target.attributes.formid.value
    let store = this.store
    let currentForm = store.peekRecord('form', formid)    
    store.createRecord('form', {
       title: currentForm.title,
       description: currentForm.description,
       templateId: currentForm.templateId,
       rep: 2,
       task: currentForm.task      
    }).save().then(function(newForm) {   
    selectedOptions.map(function (select) {
      store.findRecord('question', select.id).then(function (question) {
        // if multiEntry
        console.log(question.multiEntry)
        console.log(newForm.title)
        if (question.response && question.multiEntry) {                   
          store.createRecord('question', {
            response: select.value,
            rep: true,            
            question: question.question,
            form: newForm,
            type: question.type,
            multiEntry: question.multiEntry
          }).save()
      
        } else {
          // none multiEntry or first time multiEntry
          question.response = select.value;
          question.save();
        }
      })
    })
    }
    )
    
    // this.showQuestion() 
    this.showInput() 
    this.showInput() 
  }

  @tracked input = true
  @action
  showInput(){
    this.input = !this.input
    console.log(this.input)
  }



}
