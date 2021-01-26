import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class CreateCardComponent extends Component {


  @action
  resetForm(element) {
    this.focus(element)
    console.log('resetting form')
    this.model = 'form-template'
  }

  @action
  focus(element) {
    element.focus();
  }

  @tracked show = false;
  @action
  showCard() {

    this.show = !this.show

  }

  @tracked model = 'form-template'
  @action
  updateModel(event) {

    this.model = event.target.value
    console.log(event.target.value)
  }


  @tracked query = [];
  @action
  searchMatches() {
    console.log('newName: ' + this.newName)
    if (this.newName) {
      const router = this.router
      let model = this.model

      let search = this.store.query(model, {
        filter: {
          title: { '$regex': this.newName },
          archive: { '$gte': null }
        }
      })
      this.query = search
    } else
      this.query = ['']

  }

  @tracked methodId = ''
  @action
  updateMethodId(id) {
    this.methodId = id
    console.log(this.methodId)

    console.log('m,ethod id' + id)
    this.args.editing(id)
    this.newName = ""

  }
  

  getRandomColor() {
    return 'hsla(' + (Math.random() * 360) + ', 30%, 60%, 0.5)';
  }
  


  @tracked newName;

  @service router;
  @service store;
  @action
  createCard() {
    if (this.model !== 'method') {
      const router = this.router
      let model = null
      if (this.args.modelName == null) {
        model = router.currentRoute.attributes.modelName
      } else {
        model = this.args.modelName
      }
      // Don't want empty/null name 
      if (this.newName == '') {
        return
      }

      if (model == "project") {
        let colour = this.getRandomColor()
        this.store.createRecord(model, {
          title: this.newName,
          projectId: '121',
          createdDate: new Date(),
          colour: colour
        }).save().then(function (record) {
          const path = '/' + router.currentRoute.name + '/' + record.id
          router.transitionTo(path);
        })
      }
      if (model == "task") {
        if (this.model === "form-template") {
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
            .catch(failure)
        }
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
          title: newName,
          description: '',
          rep: '',
          edit: true,
          multEntry: false
        })
        formTemplate
          .save()
          .then(addForm)
          .catch(failure);



        function addForm(formTemplate) {
          // add form template to form record
          console.log('creating new form')


          let form = store.createRecord(model, {
            title: newName,
            description: '',
            task: myTask,
            rep: 1,
            edit: true,
            multiEntry: false,
            dateCreated: new Date(),
            templateId: formTemplate.id
          })
          form
            .save()
            .catch((reason) => console.log('error detected'));
        }
        this.show = !this.show

      }

      this.newName = ""
    } else {
      // New Method
     
      this.show = !this.show   
      let methodId = this.methodId
      let updateMethodId = this.updateMethodId
      let method = this.store.createRecord('method', {
        title: this.newName
      })
      method
        .save()
        .then(function(method){
          updateMethodId(method.id)       

        })
        .catch((reason) => console.log('error detected'));

  
    }

  
  }


  @action
  addFormTemplate(id) {
    console.log('add template form')    
    const router = this.router
    const store = this.store
    const taskId = router.currentRoute.params.task_id
    let myTask = store.peekRecord('task', taskId);
    store.findRecord('form-template', id).then(function (formTemplate) {
      console.log('templateID: ' + formTemplate.questionTemplates)
      let formRecord = store.createRecord('form', {
        title: formTemplate.title,
        description: formTemplate.description,
        rep: 1,
        edit: false,
        multiEntry: formTemplate.multiEntry,
        templateId: formTemplate.id,
        dateCreated: new Date(),
        display: false,
        task: myTask
      }
      )

      formRecord
        .save()
        .then(function (form) {
          console.log('form id:' + form.templateId)
          store.findRecord('form-template', id, { include: 'questionTemplates' }).then(async function (formTemplate) {
            console.log('template questions length:' + formTemplate.questionTemplates.length + ' ' + formTemplate.title)
            let questionTemplates = await formTemplate.questionTemplates
            questionTemplates.map(async function (questionTemplate) {
              console.log('question: ' + await questionTemplate.question)
              if (questionTemplate.required) {
                console.log('question: ' + await questionTemplate.required)
              }

              console.log('type: ' + await questionTemplate.type)

              console.log('multi-entry? : ' + questionTemplate.multiEntry)
              let question = store.createRecord('question', {
                question: questionTemplate.question,
                response: questionTemplate.response,
                rep: 1,
                multiEntry: questionTemplate.multiEntry,
                type: questionTemplate.type,
                pos: questionTemplate.pos,
                options: questionTemplate.options,
                required: questionTemplate.required,
                form: form
              })
              question
                .save()
                .catch((reason) => console.log('error in question save detected'));
            })
          }).catch((reason) => console.log('error in load form template detected'));
        })
    })


    this.show = !this.show
  }
}