import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import shortlink from 'shortlink';
import { A } from '@ember/array';

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
      // let model = this.model
      // let model = router.currentRoute.attributes.modelName
      let model = this.args.modelName
      if (this.model == "method") {
        model = "method"
      }
      let regexp = new RegExp(this.newName, 'i');
      console.log('model before: ' + model)
      if (model == "form") {
        model = "form-template"
      }
      // if(model == "project") {
      //   model = "project-template"
      //   }
      console.log('model' + model)
      let search = this.store.query(model, {
        filter: {
          title: { '$regex': regexp },
          type: { '$eq': model }
        }
      })
      this.query = search
    } else {
      this.query = ['']
    }
  }

  @tracked methodId = ''
  @action
  updateMethodId(id) {
    this.methodId = id
    console.log(this.methodId)

    console.log('method id' + id)
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
        let date = new Date()
        this.store.createRecord(model, {
          title: this.newName,
          projectId: shortlink.generate(8),
          createdDate: date,
          createdDateValue: date.valueOf(),
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
            title: formTemplate.title,
            description: '',
            task: myTask,
            edit: true,
            multiEntry: false,
            dateCreated: new Date(),
            archive: false,
            formTemplateId: formTemplate.id,
            templateId: myTask.id,
            formTemplate: formTemplate
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
      //let methodId = this.methodId
      let updateMethodId = this.updateMethodId
      let method = this.store.createRecord('method', {
        title: this.newName,
        body: `# My Demo Method Title
Record Wildlife...
## Heading
Plain text sentence.
* Bullet point
* Bullet point two
[Link](www.google.com) 
`
      })
      method
        .save()
        .then(function (method) {
          updateMethodId(method)

        })
        .catch((reason) => console.log('error detected'));
    }
  }

  @action
  addFormTemplate(id) {
    if (this.args.modelName === "project") {
      console.log('Needproject add helper?!')
      return
    }

    // While editing a method - add form to method
    if (this.args.method) {
      console.log('Add method this form: ' + id)
      let formTemplate = this.store.peekRecord('form-template', id)
      let method = this.store.peekRecord('method', this.args.method)
      if (typeof method.formTemplates == "undefined") {
        method.formTemplates = A([{
          id: formTemplate.id,
          title: formTemplate.title
        }])
      } else {
        console.log('Push on to array' + method.formTemplates.length)
        method.formTemplates.pushObject({
          id: formTemplate.id,
          title: formTemplate.title
        })
      }
      method.save()
      return
    }

    // If adding method to task:
    if (this.model == "method") {
      console.log('Adding method to this task')
      let store = this.store
      let router = this.router
      this.store.findRecord('method', id).then(function (method) {
        const taskId = router.currentRoute.params.task_id
        let task = store.peekRecord('task', taskId);
        method.get('formTemplates').map(function (methodFormTemplate) {
          store.findRecord('form-template', methodFormTemplate.id).then(function (formTemplate) {
            store.createRecord('form', {
              title: formTemplate.title,
              description: formTemplate.description,
              task: task,
              edit: false,
              multiEntry: formTemplate.multiEntry,
              methodTitle: method.title,
              methodId: method.id,
              dateCreated: new Date(),
              archive: false,
              formTemplateId: formTemplate.id,
              templateId: task.id,
              formTemplate: formTemplate
            }).save()
              .then(async function (form) {
                store.findRecord('form-template', form.formTemplateId, { include: 'questionTemplates' }).then(async function (formTemplate) {
                  let questionTemplates = await formTemplate.questionTemplates
                  questionTemplates.map(async function (questionTemplate) {
                    let question = store.createRecord('question', {
                      question: questionTemplate.question,
                      response: questionTemplate.response,
                      questionTemplate: questionTemplate,
                      questionTemplateId: questionTemplate.id,
                      multiEntry: questionTemplate.multiEntry,
                      type: questionTemplate.type,
                      pos: questionTemplate.pos,
                      required: questionTemplate.required,
                      dateCreated: new Date(),
                      archive: false,
                      form: form
                    })
                    question
                      .save()
                  })
                })
              })
          })
        })
      })
      return
    }

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
        formTemplateId: formTemplate.id,
        formTemplate: formTemplate,
        edit: false,
        multiEntry: formTemplate.multiEntry,
        templateId: myTask.id,
        dateCreated: new Date(),
        display: false,
        archive: false,
        task: myTask
      })
      formRecord
        .save()
        .then(async function (form) {
          console.log('form id:' + await form.templateId)
          store.findRecord('form-template', id, { include: 'questionTemplates' }).then(async function (formTemplate) {
            console.log('template questions length:' + await formTemplate.get('questionTemplates').length + ' ' + formTemplate.title)
            let questionTemplates = await formTemplate.questionTemplates
            questionTemplates.map(async function (questionTemplate) {
              let question = store.createRecord('question', {
                question: questionTemplate.get('question'),
                response: questionTemplate.get('response'),
                questionTemplate: questionTemplate,
                questionTemplateId: questionTemplate.get('id'),
                multiEntry: questionTemplate.get('multiEntry'),
                type: questionTemplate.get('type'),
                pos: questionTemplate.get('pos'),
                required: questionTemplate.get('required'),
                dateCreated: new Date(),
                archive: false,
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