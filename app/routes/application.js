import Route from '@ember/routing/route';
import shortlink from 'shortlink';

export default class ApplicationRoute extends Route {

  model() {
    let store = this.store
    let projects = this.store.query('project', {
      filter: { title: 'Welcome Project' }
    }).then(function (project) {
      console.log(project.content[0])
      let date = new Date()
      if (typeof project.content[0] === "undefined") {
        let projectTemplate = store.createRecord('project-template', {
          title: 'Welcome Project',
          description: 'Demo example project'
        })
        projectTemplate
          .save()
          .then(addProject)
          .catch(failure);

        function addProject(projectTemplate) {
          let project = store.createRecord('project', {
            title: 'Welcome Project',
            description: 'Demo example project',
            startDate: date,
            createdDate: date,
            dueDate: date,
            createdDateValue: date.valueOf(),
            dueDateValue: date.valueOf(),
            projectId: shortlink.generate(8),
            colour: '#FFFFFF',
            projectTemplate: projectTemplate
          })
          project
            .save()
            .then(addTask)
            .catch(failure);

          function addTask(project) {

            let formTemplate = store.createRecord('form-template', {
              title: 'Wildlife Survey',
              description: 'Record wildlife present',
              multiEntry: true
            })
            formTemplate
              .save()
              .then(addQuestionTemplate)
              .catch(failure);


            function addQuestionTemplate(formTemplate) {
              let questionTemplate = store.createRecord('question-template', {
                id: 'qt1',
                question: 'Species',
                response: '',
                multiEntry: true,
                type: 'select',
                rep: 1,
                pos: 1,
                options: 'fox,badger,hedgehog,squirrel',
                formTemplate: formTemplate
              })
              questionTemplate
                .save()
                .catch(failure);

              let questionTemplateTwo = store.createRecord('question-template', {
                id: 'qt2',
                question: 'Count',
                response: '',
                multiEntry: true,
                type: 'number',
                rep: 1,
                pos: 2,
                formTemplate: formTemplate
              })
              questionTemplateTwo
                .save()
                .then(addTaskTemplate)
                .catch(failure);
            }
          

            function addTaskTemplate() {
            let taskTemplate = store.createRecord('task-template', {
              title: 'Woodlands site',
              description: 'Woods'
            })
            taskTemplate
              .save()
              .then(addTasks)
              .catch(failure);
          

            function addTasks(taskTemplate) {
              let task = store.createRecord('task', {
                title: 'Woodlands site',
                description: 'Woods',
                project: project,
                taskTemplate: taskTemplate
              })
              task
                .save()
                .then(addForm)
                .catch(failure);

              function addForm(task) {
                let form = store.createRecord('form', {
                  title: 'Wildlife Survey',
                  description: 'Record wildlife present',
                  task: task,
                  rep: 1,
                  edit: false,
                  multiEntry: true,
                  dateCreated: new Date(),
                  display: true,
                  formTemplate: formTemplate
                })
                form
                  .save()
                  .then(addQuestion)
                  .catch(failure);

              }
            }
          }
          }

          function failure(reason) {
            console.log(reason) // handle the error
            return
          }


          function addQuestion(form) {
            let question = store.createRecord('question', {
              question: 'Species',
              response: 'Fox',
              multiEntry: true,
              type: 'select',
              rep: 1,
              pos: 1,
              options: 'fox,badger,hedgehog,squirrel',
              form: form,
              questionTemplate: 'questionTemplate_2_qt1'
            })
            question
              .save()
              .catch(failure)

            let questionTwo = store.createRecord('question', {
              question: 'Count',
              response: '5',
              multiEntry: true,
              type: 'number',
              rep: 1,
              pos: 2,
              form: form,
              questionTemplate: 'questionTemplate_2_qt2'
            })
            questionTwo
              .save()
              .catch(failure);

          }


        }








      }
    }
    )
  }
}