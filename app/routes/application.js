import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {

  model() {

    let store = this.store

    let projects = this.store.query('project', {
      filter: { title: 'Welcome Project' }
    }).then(function (project) {
      console.log(project.content[0])

      if (typeof project.content[0] === "undefined") {
        let project = store.createRecord('project', {
          title: 'Welcome Project',
          description: 'Demo example project'
        })

        let formTemplate = store.createRecord('form-template', {
          title: 'Wildlife Survey',
          description: 'Record wildlife present'
        })
        formTemplate
          .save()
          .then(addQuestionTemplate)
          .catch(failure);

        function addQuestionTemplate(formTemplate) {
          let questionTemplate = store.createRecord('question-template', {
            question: 'Species',
            response: '',
            multiEntry: true,
            type: 'select',
            rep: 1,
            formTemplate: formTemplate
          })
          questionTemplate
            .save()
            .catch(failure);        
        }

        function failure(reason) {
          console.log(reason) // handle the error
          return
        }
        project
          .save()
          .then(addTask)
          .catch(failure);

        function addTask(project) {

          let task = store.createRecord('task', {
            title: 'Woodlands site',
            description: 'Woods',
            project: project
          })
          task
            .save()
            .then(addForm)
            .catch(failure);

        }



        function addForm(task) {

          let form = store.createRecord('form', {
            title: 'Wildlife Survey',
            description: 'Record wildlife present',
            task: task,
            templateId: formTemplate.id
          })
          form
            .save()
            .then(addQuestion)
            .catch(failure);

        }

        function addQuestion(form) {
          let response = store.createRecord('question', {
            question: 'Species',
            response: '',
            multiEntry: true,
            type: 'select',
            rep: 1,
            form: form
          })
          response
            .save()
            .catch(failure);

        }
      }

    }
    )
  }
}