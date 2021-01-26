import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'


export default class CounterComponent extends Component {

  @tracked edit = false;

  @service store;
  @action
  editForm() {
    let id = this.args.model.id
    this.store.findRecord('form', id).then(function (form) {
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

  @tracked hideEditQuestion = false;
  @action
  hideEditingQuestion() {
    this.hideEditQuestion = !this.hideEditQuestion
    console.log("hideEditQuestion: " + this.hideEditQuestion)

  }


  @tracked selectedOptions = [];

  @action
  formChange(event) {
    //event.preventDefault()
   

    if(event.target.type === "checkbox" &&
      typeof event.target.attributes.response.value !== "undefined" &&
       event.target.attributes.response.value === "on" 
       ) {
      event.target.value = ''
    }
    let selection = { id: event.target.id, value: event.target.value }
    if (this.selectedOptions.length === 0) {
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
    //this.hideEditingQuestion()

    console.log('hideEditQuestion: ' + this.hideEditQuestion)
  }

  @action
  addSelections(event) {
    console.log('save addSelecitons hellO!')
    //event.preventDefault();  
    console.log(event)
    console.log(this.formElement.childNodes)
    console.log('select options length: ' + this.selectedOptions.length)
    let selectedOptions = this.selectedOptions
    console.log(selectedOptions)
    console.log("save data")
    console.log('formid:' + event.target.attributes.formid.value)
    let formid = event.target.attributes.formid.value
    let store = this.store
    let currentForm = store.peekRecord('form', formid, { include: 'questions' })
    let update = event.target.attributes.update.value
    console.log('update: ' + update)
    console.log('rep: ' + currentForm.rep)
    if (currentForm.multiEntry
      && currentForm.display == true
      && update === "false"
      && selectedOptions.length > 0
    ) {
      let questions = currentForm.questions
      let requiredId = []
      questions.map(function (question) {
        if (question.required != undefined && question.required === true) {
          requiredId.push(question.id)
        }
      })
      let selectedId =  selectedOptions.map(function(item){
         return item.id
      })
      console.log('selectId: ' + selectedId)
      console.log('requiredId: ' + requiredId)
      const found = requiredId.filter(id => selectedId.includes(id));
      console.log('found: ' + found)
      if (found.length >= requiredId.length) {
      store.createRecord('form', {
        title: currentForm.title,
        description: currentForm.description,
        templateId: currentForm.templateId,
        multiEntry: currentForm.multiEntry,
        rep: 2,
        task: currentForm.task,
        display: true
      }).save().then(function (newForm) {
        // check if any required questions not entered by matching question.id to select.id???
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
                pos: question.pos,
                options: question.options,
                required: question.required,
                multiEntry: question.multiEntry
              }).save()
             
            })
        })
      })
      this.selectedOptions = []
    } else { return }
    }
    else {
      // update form (don't create new form)
      console.log('updating response')
      if (selectedOptions.length > 0) {
        let questions = currentForm.questions
        let requiredId = []
        let questionEntered = []
        questions.map(function (question) {
          if (question.required != undefined && question.required === true) {
            requiredId.push(question.id)
          }
          if (question.response != '') {
            questionEntered.push(question.id)
          }

        })
        let selectedId =  selectedOptions.map(function(item){
           return item.id
        })
        console.log('selectId: ' + selectedId)
        console.log('requiredId: ' + requiredId)
        const found = requiredId.filter(id => selectedId.includes(id));
        console.log('found: ' + found)       
        if (found.length >= requiredId.length || questionEntered.length > 0) {
          currentForm.rep = 2
          currentForm.display = true
          currentForm.save()
          selectedOptions.map(function (select) {
            console.log('SELECTED VALUE' + select.value)
            console.log('selectid' + select.id)
            store.findRecord('question', select.id)
              .then(function (question) {
                question.response = select.value
                question.save()
              })
              
          })
          this.selectedOptions = []
        
        } else {
          console.log('fail')
          return
        }
      } else {
        return
      }
     
    }
 
    if (this.hideEditQuestion === true) {
      this.hideEditingQuestion()
    }
    console.log('showInput: ' + this.input)    
   
  }

  @tracked input = true
  @action
  showInput() {
    this.input = !this.input
    console.log(this.input)

  }

  get orderByPosition() {
    let questions = this.args.questions
    questions.map(item => console.log('question order?' + item.pos))

    let sorted = questions.sortBy('pos')

    sorted.map(item => console.log('sorted order?' + item.pos))
    return sorted

  }

  get orderFormQuestionsByPosition() {
    console.log('order question in forms')
    let forms = this.args.allforms

    //  let sorted = forms.map(function(form){      
    //    form.questions.sortBy('pos')    

    //   })

    return forms

  }

  get questionNumber() {

    let questions = this.args.questions
   console.log('ql: ' + questions.length)
   let responses = []
   questions.map(function(question) {
      if(question.response != '') {
        responses.push(question.response)
      }
   })
   let percentage = (responses.length / questions.length) * 100
   let complete = false
   let text = `${responses.length}/${questions.length}`
   if(percentage == 100) {
     complete = true
   } 


   let stats = {
     total: questions.length,
     responses: responses.length,    
     percentage: percentage,
     complete: complete,
     text: text
    }
    return stats

  }
}
