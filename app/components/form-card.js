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

  @tracked menu = "";
  @action
  showMenu(index) {
    event.preventDefault()
    this.menu = index
    console.log("menu: " + this.menu)

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
  @tracked hideEditQuestion = true;
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
          this.hideEditQuestion !=  this.hideEditQuestion
          console.log('hideEditQuestion: ' + this.hideEditQuestion)
  }

  @action
  addSelections(event) {   
    event.preventDefault();  
    console.log(event)  
    console.log(this.formElement.childNodes)    
    console.log('select options: ' + this.selectedOptions)
    let selectedOptions = this.selectedOptions
    console.log("save data")
    console.log('formid:' + event.target.attributes.formid.value)    
    let formid = event.target.attributes.formid.value
    let store = this.store
    let currentForm = store.peekRecord('form', formid) 
     let update = event.target.attributes.update.value
     console.log('update: ' + update)
     console.log('rep: ' +  currentForm.rep)
    if(currentForm.multiEntry
       && currentForm.display == true  
       && update === "false"

       ) {
    store.createRecord('form', {
       title: currentForm.title,
       description: currentForm.description,
       templateId: currentForm.templateId,
       multiEntry: currentForm.multiEntry,
       rep: 2,
       task: currentForm.task,
       display: true
    }).save().then(function(newForm) {   
    selectedOptions.map(function (select) {
      console.log('question id: ' + select.id)
      store.findRecord('question', select.id)
      .then(function (question) {
        // if multiEntry
        console.log('multi-entry: ' + question.multiEntry)
        console.log(newForm.title)
                         
          store.createRecord('question', {
            response: select.value,
            rep: true,            
            question: question.question,
            form: newForm,
            type: question.type,
            multiEntry: question.multiEntry
          }).save()
      
        }) 
      })
    })
  }      
   else {    
   // update form (don't create new form)
   console.log('updating response')
   store.findRecord('form', formid)
       .then(function(form) {
        form.rep = 2
        form.display = true
        form.save()
       })
   
    selectedOptions.map(function (select) {
      console.log(select.value)
      console.log('selectid' + select.id)
      store.findRecord('question', select.id)
      .then(function (question) {
        question.response = select.value
        question.save()
      })
    })      
  }
  console.log('selectOptions: '  + this.selectedOptions)
    this.hideEditQuestion = false
  console.log('hideEditQuestion2: ' + this.hideEditQuestion)
    // this.showQuestion() 
     this.showInput() 
    this.showInput() 
    console.log('shouwINput' + this.input)
  }

  @tracked input = true
  @action
  showInput(){
    this.input = !this.input
    console.log(this.input)
  }

  get orderByPosition(){    
    let questions = this.args.questions  
    questions.map(item => console.log('question order?' + item.pos))
    
    let sorted = questions.sortBy('pos') 

    sorted.map(item => console.log('sorted order?' + item.pos))
    return sorted

  }

  get orderFormQuestionsByPosition(){   
     console.log('order question in forms')
    let forms = this.args.allforms  
   
  //  let sorted = forms.map(function(form){      
  //    form.questions.sortBy('pos')    
      
  //   })

    return forms

  }


}
