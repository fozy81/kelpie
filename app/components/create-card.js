import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';
import shortlink from 'shortlink';
import { A } from '@ember/array';
import { addItem } from 'kelpie/utils/add-item';

export default class CreateCardComponent extends Component {
  @action
  resetForm(element) {
    this.focus(element);
    console.log('resetting form');
    this.model = 'form-template';
  }

  @action
  focus(element) {
    element.focus();
  }

  @tracked show = false;
  @action
  showCard() {
    console.log('showCard function');
    this.show = !this.show;
  }

  @tracked model = 'form-template';
  @action
  updateModel(event) {
    this.model = event.target.value;
    console.log(event.target.value);
  }

  @tracked query = [];
  @action
  searchMatches() {
    console.log('newName: ' + this.newName);
    if (this.newName) {
      const router = this.router;
      // let model = this.model
      // let model = router.currentRoute.attributes.modelName
      let model = this.args.modelName;
      if (this.model == 'method') {
        model = 'method';
      }

      let regexp_search = new RegExp(this.newName, 'i');
      // let regexp_search = this.newName;
      console.log('model before: ' + model);
      if (model == 'form') {
        model = 'form-template';
      }
      if (model == 'task-template') {
        model = 'form-template';
      }
      if (model == 'container') {
        model = 'container-template';
      }
      // if(model == "project") {
      //   model = "project-template"
      //   }
      console.log('model: ' + model);
      if (model == 'task') {
        model = 'task-template';
      }
      console.log('search term: ' + regexp_search);
      console.log('model search: ' + model);
      let search = this.store.query(model, {
        filter: {
          title: { $regex: regexp_search },
          type: { $eq: model },
        },
        sort: [{ title: 'asc' }],
        limit: 10,
      });
      //   if(typeof search.id !== "undefined") {
      //     console.log(search.id)
      //  search = this.store.findRecord('form-template', search.id, {
      //    include: 'containerTemplate, questionTemplates'
      //   })

      this.query = search;
    } else {
      this.query = [''];
    }
  }

  @tracked methodId = '';
  @action
  updateMethodId(id) {
    this.methodId = id;
    console.log(this.methodId);

    console.log('method id' + id);
    this.args.editing(id);
    this.newName = '';
  }
  getRandomColor() {
    return 'hsla(' + Math.random() * 360 + ', 30%, 60%, 0.5)';
  }

  @tracked newName;

  @service router;
  @service store;
  @action
  createCard() {
    if (this.model !== 'method') {
      const router = this.router;
      let model = null;
      if (this.args.modelName == null) {
        model = router.currentRoute.attributes.modelName;
      } else {
        model = this.args.modelName;
      }
      // Don't want empty/null name
      if (this.newName == '') {
        return;
      }

      if (model == 'project') {
        let colour = this.getRandomColor();
        let date = new Date();
        this.store
          .createRecord(model, {
            title: this.newName,
            projectId: shortlink.generate(8),
            createdDate: date,
            createdDateValue: date.valueOf(),
            colour: colour,
          })
          .save()
          .then(function (record) {
            const path = '/' + router.currentRoute.name + '/' + record.id;
            router.transitionTo(path);
          });
      }

      if (model == 'container-template') {
        console.log(
          'create new container record for form template Id: ' +
            this.args.formTemplateId
        );
        let formTemplate = this.store.peekRecord(
          'formTemplate',
          this.args.formTemplateId
        );
        this.store
          .createRecord(model, {
            title: this.newName,
            description: '',
          })
          .save()
          .then(function (containerTemplate) {
            console.log('container Template details: ' + containerTemplate.id);
            formTemplate.containerTemplateId = containerTemplate.id;
            formTemplate.containerTemplate = containerTemplate;
            formTemplate.save();
          });
      }

      if (model == 'task') {
        if (this.model === 'form-template') {
          const id = router.currentRoute.params.project_id;
          let store = this.store;
          let newName = this.newName;
          let myProject = this.store.peekRecord('project', id);
          let taskTemplate = this.store.createRecord('task-template', {
            title: this.newName,
            project: myProject,
          });

          taskTemplate.save().then(addTask);

          function addTask() {
            let task = store.createRecord(model, {
              title: newName,
              project: myProject,
              taskTemplateId: taskTemplate.id,
              taskTemplate: taskTemplate,
            });

            function containerSave(task) {
              let containerRecord = store.createRecord('container', {
                title: '',
                description: '',
                level: task.id,
                createdDate: new Date(),
                createdDateValue: new Date().valueOf(),
                modifiedDate: new Date(),
                modifiedDateValue: new Date().valueOf(),
                task: task,
              });
              return containerRecord.save();
            }

            function transitionToTask(containerRecord) {
              router.transitionTo('/task/' + containerRecord.level);
            }

            function failure(reason) {
              console.log(reason); // handle the error
            }

            task
              .save()
              .then(containerSave)
              .then(transitionToTask)
              .catch(failure);
          }
        }
      }

      if (model == 'task-template') {
        function failure(reason) {
          console.log(reason); // handle the error
        }

        const id = router.currentRoute.params.task_id;
        let store = this.store;
        let newName = this.newName;
        let myTask = this.store.peekRecord('task', id);
        console.log('creating task template form ' + newName + ' ' + id);
        this.store
          .findRecord('task-template', myTask.taskTemplateId)
          .then(function (taskTemplate) {
            let formTemplate = store.createRecord('form-template', {
              title: newName,
              edit: true,
              multiEntry: false,
              archive: false,
              taskTemplate: taskTemplate,
              taskTemplateId: taskTemplate.id,
            });
            formTemplate.save().then(addForm).catch(failure);
          });

        function addForm(formTemplate) {
          // add form template to form reco

          let taskTemplate = store.peekRecord(
            'task-template',
            myTask.taskTemplateId
          );
          console.log('creating new task form');
          let form = store.createRecord('form', {
            title: formTemplate.title,
            description: '',
            task: myTask,
            edit: true,
            newForm: true,
            multiEntry: false,
            createdDate: new Date(),
            createdDateValue: new Date().valueOf(),
            archive: false,
            formTemplateId: formTemplate.id,
            formTemplate: formTemplate,
            taskTemplate: taskTemplate,
            taskTemplateId: taskTemplate.id,
          });
          form.save().catch((reason) => console.log('error detected'));
        }
        this.show = !this.show;
      }

      if (model == 'form') {
        const store = this.store;
        const newName = this.newName;
        const id = router.currentRoute.params.task_id;
        let container = this.args.container;
        function failure(reason) {
          console.log(reason); // handle the error
        }

        // Create container template here!

        let containerTemplate = store.createRecord('container-template', {
          title: '',
          description: '',
        });
        containerTemplate
          .save()
          .then(addFormTemplate)
          .then(addForm)
          .catch(failure);

        function addFormTemplate(containerTemplate) {
          let formTemplate = store.createRecord('form-template', {
            title: newName,
            description: '',
            edit: true,
            multiEntry: false,
            taskTemplateId: '',
            containerTemplate: containerTemplate,
            containerTemplateId: containerTemplate.id,
          });
          return formTemplate.save();
        }

        function addForm(formTemplate) {
          // add form template to form record
          let myTask = store.peekRecord('task', id);
          console.log('creating new form - container: ' + container.id);
          let form = store.createRecord(model, {
            title: formTemplate.title,
            description: '',
            task: myTask,
            edit: true,
            newForm: true,
            multiEntry: false,
            dateCreated: new Date(),
            archive: false,
            formTemplateId: formTemplate.id,
            templateId: myTask.id,
            formTemplate: formTemplate,
            taskTemplateId: formTemplate.taskTemplateId,
            container: container,
          });
          form.save().catch((reason) => console.log('error detected'));
        }
        this.show = !this.show;
      }
      this.newName = '';
    } else {
      // New Method
      this.show = !this.show;
      //let methodId = this.methodId
      let updateMethodId = this.updateMethodId;
      let method = this.store.createRecord('method', {
        title: this.newName,
        body: `# My Demo Method Title
Record Wildlife...
## Heading
Plain text sentence.
* Bullet point
* Bullet point two
[Link](www.google.com) 
`,
      });
      method
        .save()
        .then(function (method) {
          updateMethodId(method);
        })
        .catch((reason) => console.log('error detected'));
    }
  }

  @action
  addFormTemplate(id) {
    console.log('hello from add new template form!');
    if (this.args.modelName === 'project') {
      console.log('Need project add helper?!');
      return;
    }

    if (this.args.modelName === 'task-template') {
      console.log('add form to task-template');
      const router = this.router;
      const store = this.store;
      const taskId = router.currentRoute.params.task_id;
      let myTask = store.peekRecord('task', taskId);
      console.log(myTask.taskTemplateId);

      store
        .findRecord('task-template', myTask.taskTemplateId, {
          include: 'forms.questions',
        })
        .then(async function (taskTemplate) {
          store.findRecord('form-template', id).then(function (formTemplate) {
            store
              .createRecord('form', {
                title: formTemplate.title,
                description: formTemplate.description,
                edit: false,
                multiEntry: formTemplate.multiEntry,
                createdDate: new Date(),
                createdDateValue: new Date().valueOf(),
                archive: false,
                formTemplateId: formTemplate.id,
                formTemplate: formTemplate,
                taskTemplate: taskTemplate,
                taskTemplateId: taskTemplate.id,
              })
              .save()
              .then(function (form) {
                store
                  .findRecord('form-template', form.formTemplateId, {
                    include: 'questionTemplates',
                  })
                  .then(async function (formTemplate) {
                    let questionTemplates = await formTemplate.questionTemplates;
                    questionTemplates.map(async function (questionTemplate) {
                      let question = store.createRecord('question', {
                        question: questionTemplate.question,
                        response: questionTemplate.response,
                        questionTemplate: questionTemplate,
                        questionTemplateId: questionTemplate.id,
                        multiEntry: questionTemplate.multiEntry,
                        units: questionTemplate.units,
                        type: questionTemplate.type,
                        pos: questionTemplate.pos,
                        required: questionTemplate.required,
                        dateCreated: new Date(),
                        archive: false,
                        form: form,
                      });
                      question.save();
                    });
                  });
              });
          });
        });
      return;
    }

    // While editing a method - add form to method
    if (this.args.method) {
      console.log('Add method this form: ' + id);
      let formTemplate = this.store.peekRecord('form-template', id);
      let method = this.store.peekRecord('method', this.args.method);
      if (typeof method.formTemplates == 'undefined') {
        method.formTemplates = A([
          {
            id: formTemplate.id,
            title: formTemplate.title,
          },
        ]);
      } else {
        console.log('Push on to array' + method.formTemplates.length);
        method.formTemplates.pushObject({
          id: formTemplate.id,
          title: formTemplate.title,
        });
      }
      method.save();
      return;
    }

    // If adding method to task:
    if (this.model == 'method') {
      console.log('Adding method to this task');
      let store = this.store;
      let router = this.router;
      this.store.findRecord('method', id).then(function (method) {
        const taskId = router.currentRoute.params.task_id;
        let task = store.peekRecord('task', taskId);
        method.get('formTemplates').map(function (methodFormTemplate) {
          store
            .findRecord('form-template', methodFormTemplate.id)
            .then(function (formTemplate) {
              store
                .createRecord('form', {
                  title: formTemplate.title,
                  description: formTemplate.description,
                  task: task,
                  edit: false,
                  multiEntry: formTemplate.multiEntry,
                  methodTitle: method.title,
                  methodId: method.id,
                  createdDate: new Date(),
                  createdDateValue: new Date().valueOf(),
                  archive: false,
                  formTemplateId: formTemplate.id,
                  templateId: task.id,
                  formTemplate: formTemplate,
                })
                .save()
                .then(async function (form) {
                  store
                    .findRecord('form-template', form.formTemplateId, {
                      include: 'questionTemplates',
                    })
                    .then(async function (formTemplate) {
                      let questionTemplates = await formTemplate.questionTemplates;
                      questionTemplates.map(async function (questionTemplate) {
                        let question = store.createRecord('question', {
                          question: questionTemplate.question,
                          response: questionTemplate.response,
                          questionTemplate: questionTemplate,
                          questionTemplateId: questionTemplate.id,
                          multiEntry: formTemplate.multiEntry,
                          type: questionTemplate.type,
                          pos: questionTemplate.pos,
                          required: questionTemplate.required,
                          dateCreated: new Date(),
                          archive: false,
                          min: questionTemplate.min,
                          max: questionTemplate.max,
                          step: questionTemplate.step,
                          units: questionTemplate.units,
                          default: questionTemplate.default,
                          form: form,
                        });
                        question.save();
                      });
                    });
                });
            });
        });
      });
      return;
    }

    if (this.args.modelName === 'task') {
      const router = this.router;
      const store = this.store;
      const projectId = router.currentRoute.params.project_id;
      let myProject = store.peekRecord('project', projectId);
      let date = new Date();
      let n = date.valueOf();
      store.findRecord('task-template', id).then(function (taskTemplate) {
        console.log('templateID: ' + taskTemplate.title);
        let taskRecord = store.createRecord('task', {
          title: taskTemplate.title,
          description: taskTemplate.description,
          taskTemplateId: taskTemplate.id,
          archive: false,
          createdDate: date,
          createdDateValue: n,
          modifiedDate: date,
          modifiedDateValue: n,
          project: myProject,
          taskTemplate: taskTemplate,
        });
        taskRecord.save().then(function (taskRecord) {
          let container = store.createRecord('container', {
            title: '',
            description: '',
            containerId: shortlink.generate(8),
            task: taskRecord,
            level: taskRecord.id,
            createdDate: date,
            createdDateValue: n,
          });
          container.save();
        });
      });
      return;
    }

    console.log('add template form');
    console.log('model: ' + this.args.modelName);

    const router = this.router;
    const store = this.store;

    const taskId = router.currentRoute.params.task_id;
    let myTask = store.peekRecord('task', taskId);
    if (this.args.label == 'Add Default Container') {
      console.log('containerTemplate: ' + id);
      console.log('formTemplateId: ' + this.args.formTemplateId);
      let formTemplateId = this.args.formTemplateId;
      // Two generic functions?
      // addItem? Adds an item to an existing document (form, container, task??).
      // e.g. pass a containerTemplate (item) object to a formTemplate?
      // requires a editing component to always have access to these
      // use async functions not promises??

      // Change container the form is in (or change task or project?)
      // Pass in document (form or list of containers or tasks)
      // Pass in item (containerTemplate or new taskTemplate or projectTemplate)
      // Create new instance (container?) or update task, project?
      // If container, update form to match mainLevelId etc of container etc?
      // changeItem(document = form, item = container)
      // changeItem(document = task, item = taskTemplate)
      // or move container up a level until reaches top level (containerId = taskId?)
      // changeItem(document = form, item = containerTemplate, context = currentContainer)

      // Remove item -
      // removeItem(document = container)

      let document = store.peekRecord('form-template', formTemplateId);
      let item = store.peekRecord('container-template', id);
      document = addItem(document, item);
      document.save();
      return;
    }

    let currentContainer = this.args.container;
    console.log('cc' + currentContainer);
    console.log(
      'container? ' +
        currentContainer.id +
        ' container name: ' +
        currentContainer.title
    );

    store
      .findRecord('form-template', id, {
        include: 'containerTemplate,questionTemplates',
      })
      .then(async function (formTemplate) {
        console.log('templateID: ' + formTemplate.questionTemplates);
        console.log(
          'If this form has a container create new container? ' +
            formTemplate.containerTemplateId
        );
        console.log('check container: ' + formTemplate.containerTemplateId);

        let containerTemplate = async function () {
          if (formTemplate.containerTemplateId == null) {
            let containerTemplate = currentContainer;
            return containerTemplate;
          } else {
            let containerTemplate = store.findRecord(
              'container-template',
              formTemplate.containerTemplateId
            );
            return containerTemplate;
          }
        };
        containerTemplate().then(function (containerTemplate) {
          let addContainer = async function () {
            let container = currentContainer;
            console.log(container.title);

            if (
              currentContainer.title == '' &&
              containerTemplate.get('title') !== ''
            ) {
              console.log('container title null');
              container = store.createRecord('container', {
                title: containerTemplate.get('title'),
                description: containerTemplate.get('description'),
                containerId: shortlink.generate(8),
                task: myTask,
                level: currentContainer.level,
              });
              return container.save();
            } else {
              return container;
            }
          };
          let addformRecord = function (container) {
            let formRecord = store.createRecord('form', {
              title: formTemplate.title,
              description: formTemplate.description,
              formTemplateId: formTemplate.id,
              formTemplate: formTemplate,
              edit: false,
              multiEntry: formTemplate.multiEntry,
              templateId: container.id,
              createdDate: new Date(),
              createdDateValue: new Date().valueOf(),
              display: false,
              archive: false,
              taskTemplateId: formTemplate.taskTemplateId,
              container: container,
            });
            return formRecord.save();
          };
          addContainer()
            .then(addformRecord)
            .then(async function (form) {
              console.log('form id:' + (await form.get('templateId')));
              store
                .findRecord('form-template', id, {
                  include: 'questionTemplates',
                })
                .then(async function (formTemplate) {
                  console.log(
                    'template questions length:' +
                      (await formTemplate.get('questionTemplates').length) +
                      ' ' +
                      formTemplate.get('title')
                  );
                  let questionTemplates = await formTemplate.questionTemplates;
                  questionTemplates.map(async function (questionTemplate) {
                    let question = store.createRecord('question', {
                      question: questionTemplate.get('question'),
                      response: questionTemplate.get('response'),
                      questionTemplate: questionTemplate,
                      questionTemplateId: questionTemplate.get('id'),
                      multiEntry: questionTemplate.get('multiEntry'),
                      type: questionTemplate.get('type'),
                      pos: questionTemplate.get('pos'),
                      units: questionTemplate.get('units'),
                      required: questionTemplate.get('required'),
                      dateCreated: new Date(),
                      archive: false,
                      form: form,
                    });
                    question
                      .save()
                      .catch((reason) =>
                        console.log('error in question save detected')
                      );
                  });
                })
                .catch((reason) =>
                  console.log('error in load form template detected')
                );
            });
        });
      });
    this.show = !this.show;
  }
}
