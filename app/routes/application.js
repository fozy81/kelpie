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
          description: 'Record wildlife present',
          multiEntry: true
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
            
            let questionTemplateTwo = store.createRecord('question-template', {
              question: 'Count',  
              response: '',                     
              multiEntry: true,
              type: 'number',
              rep: 1,
              formTemplate: formTemplate
            })
            questionTemplateTwo
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
            rep: 1,
            edit: false,
            multiEntry: true,
            templateId: formTemplate.id
          })
          form
            .save()
            .then(addQuestion)            
            .catch(failure);

        }

        function addQuestion(form) {
          let question = store.createRecord('question', {
            question: 'Species', 
            response: 'Fox',           
            multiEntry: true,
            type: 'select',
            rep: 1,
            form: form
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
              form: form
            })
            questionTwo
              .save()                                     
              .catch(failure);      

        }
      }
    }
    )
  }
}