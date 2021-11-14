import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import shortlink from 'shortlink';
import ENV from 'kelpie/config/environment';

export default class ApplicationRoute extends Route {
  // @service session;
  // beforeModel(transition) {
  //   console.log(transition.intent.url);
  //   this.session.requireAuthentication(transition, 'login');
  //   if (!this.session.isAuthenticated && ENV.locationType !== 'none') {
  //     this.replaceWith('login');
  //   }
  //   if (transition.intent.url == '/login') {
  //     this.replaceWith('projects');
  //   }
  // }

  model() {
    // if (this.session.isAuthenticated || ENV.locationType === 'none') {
    let store = this.store;
    let projects = this.store
      .query('project', {
        filter: { title: 'Welcome Project' },
      })
      .then(function (project) {
        function failure(reason) {
          console.log(reason); // handle the error
          return;
        }

        //console.log(project.content[0])
        let date = new Date();
        if (typeof project.content[0] === 'undefined') {
          let projectTemplate = store.createRecord('project-template', {
            title: 'Welcome Project',
            description: 'Demo example project',
          });
          projectTemplate.save().then(addProject).catch(failure);

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
              projectTemplate: projectTemplate,
            });
            project.save().then(addTask).catch(failure);

            function addTask(project) {
              function failure(reason) {
                console.log(reason); // handle the error
                return;
              }

              let formTemplate = store.createRecord('form-template', {
                title: 'Wildlife Survey',
                description: 'Record wildlife present',
                archive: false,
                multiEntry: true,
              });
              formTemplate.save().then(addQuestionTemplate).catch(failure);

              function addQuestionTemplate(formTemplate) {
                let questionTemplate = store.createRecord('question-template', {
                  question: 'Species',
                  response: '',
                  multiEntry: true,
                  type: 'select',
                  pos: 1,
                  archive: false,
                  options:
                    'Acroloxidae,Aeshnidae,Ancylidae,Aphelocheiridae,Asellidae,Astacidae,Athericidae,Baetidae,Beraeidae,Bithyniidae,Brachycentridae,Caenidae,Calopterygidae,Capniidae,Ceratopogonidae,Chaoboridae,Chironomidae,Chloroperlidae,Coenagrionidae,Cordulegasteridae,Cordulegastridae,Corixidae,Corophiidae,Crangonyctidae,Culicidae,Dendrocoelidae,Dixidae,Dolichopodidae,Dreissenidae,Dryopidae,Dugesiidae,Dytiscidae,Elmidae,Empididae,Ephemerellidae,Ephemeridae,Ephydridae,Erpobdellidae,Gammaridae,Gerridae,Glossiphoniidae,Glossosomatidae,Goeridae,Gyrinidae,Haliplidae,Heptageniidae,Hirudinidae,Hydraenidae,Hydrobiidae,Hydrometridae,Hydrophilidae (including Helophoridae + Georissidae and Hydrochidae),Hydropsychidae,Hydroptilidae,Hygrobiidae,Lepidostomatidae,Leptoceridae,Leptophlebiidae,Leuctridae,Libellulidae,Limnephilidae (including Apataniidae),Lymnaeidae,Mesoveliidae,Molannidae,Muscidae,Naucoridae,Nemouridae,Nepidae,Neritidae,Niphargidae,Noteridae,Notonectidae,Odontoceridae,Oligochaeta,Perlidae,Perlodidae,Philopotamidae,Phryganeidae,Physidae,Piscicolidae,Planariidae,Planorbidae,Platycnemididae,Pleidae,Polycentropodidae,Potamanthidae,Psychodidae,Psychomyiidae,Ptychopteridae,Rhagionidae,Rhyacophilidae,Sciomyzidae,Scirtidae,Sericostomatidae,Sialidae,Simuliidae,Siphlonuridae (including Ameletidae),Sisyridae,Sphaeriidae,Stratiomyidae,Syrphidae,Tabanidae,Taeniopterygidae,Tipulidae (including Limoniidae + Cylindrotomidae and Pediciidae),Unionidae,Valvatidae,Veliidae,Viviparidae',
                  formTemplate: formTemplate,
                });
                questionTemplate.save().catch(failure);

                let questionTemplateTwo = store.createRecord(
                  'question-template',
                  {
                    question: 'Count',
                    response: '',
                    multiEntry: true,
                    type: 'number',
                    pos: 2,
                    archive: false,
                    formTemplate: formTemplate,
                  }
                );
                questionTemplateTwo.save().then(addTaskTemplate).catch(failure);

                function addTaskTemplate() {
                  let taskTemplate = store.createRecord('task-template', {
                    title: 'Woodlands site',
                    description: 'Woods',
                    lat: 56.6,
                    lon: 34.3,
                  });
                  taskTemplate.save().then(addTasks).catch(failure);

                  function addTasks(taskTemplate) {
                    let task = store.createRecord('task', {
                      id: "D567013B-7D43-0096-8539-46EA508D383E",
                      title: 'Woodlands site',
                      description: 'Woods',
                      project: project,
                      taskTemplate: taskTemplate,
                      taskTemplateId: taskTemplate.id,
                    });
                    task.save().then(addContainer).catch(failure);

                    function addContainer(task) {
                      let container = store.createRecord('container', {
                        id: "C343A8B8-DFA7-067A-BD85-1C97FA4828C1",
                        title: 'Box',
                        description: 'Box',
                        level: "D567013B-7D43-0096-8539-46EA508D383E",
                        task: task,
                        createdDate: new Date(),
                        createdDateValue: new Date().valueOf(),
                        archive: false,
                      });
                      container.save().then(addForm).catch(failure);

                      
                      let containerOne = store.createRecord('container', {
                        title: 'Box',
                        description: 'Box',
                        level: "C343A8B8-DFA7-067A-BD85-1C97FA4828C1",
                        task: task,
                        createdDate: new Date(),
                        createdDateValue: new Date().valueOf(),
                        archive: false,
                      });
                      containerOne.save()

                      let containerTwo = store.createRecord('container', {
                        title: '',
                        description: '',
                        level: "D567013B-7D43-0096-8539-46EA508D383E",
                        task: task,
                        createdDate: new Date(),
                        createdDateValue: new Date().valueOf(),
                        archive: false,
                      });
                      containerTwo.save()
                                        

                      function addForm(container) {
                        let form = store.createRecord('form', {
                          title: 'Wildlife Survey',
                          description: 'Record wildlife present',
                          methodId: 1,
                          container: container,
                          templateId: container.id,
                          taskTemplateId: '',
                          formTemplateId: formTemplate.id,
                          edit: false,
                          multiEntry: true,
                          createdDate: new Date(),
                          createdDateValue: new Date().valueOf(),
                          display: true,
                          archive: false,
                          formTemplate: formTemplate,
                        });
                        form.save().then(addQuestion).catch(failure);
                      }
                    
                    }
                  
                  }
                }
                function addQuestion(form) {
                  let question = store.createRecord('question', {
                    question: 'Species',
                    questionTemplateId: questionTemplate.id,
                    response: 'Elmidae',
                    multiEntry: true,
                    type: 'select',
                    pos: 1,
                    form: form,
                    archive: false,
                    questionTemplate: questionTemplate,
                  });
                  question.save().catch(failure);

                  let questionTwo = store.createRecord('question', {
                    question: 'Count',
                    questionTemplateId: questionTemplateTwo.id,
                    response: '5',
                    multiEntry: true,
                    type: 'number',
                    pos: 2,
                    form: form,
                    archive: false,
                    questionTemplate: questionTemplateTwo,
                  });
                  questionTwo.save().catch(failure);

                  let method = store.createRecord('method', {
                    id: 1,
                    title: 'Wildlife',
                    body: ` # My Demo Method 
                                Record Wildlife...
                                ## 1. Record Date, Time and Sampler
                                * Date - current date
                              * Local time at commencement of method (+/- minute)
                                  * Sampler name
                                ## 2. Record Wildlife
                                  * Identify wildlife and and count individuals`,
                  });
                  method.save().catch(failure);
                }
              }
            }
          }
        }
      });
  }
  //  }

  // sessionInvalidated() {
  //   //data may still be viewed, so no window.reload needed
  //   //remove sessionInvalidated and go back to default ApplicationRouteMixin behaviour if you want to clear JS cache after logout
  //   this.transitionTo('index');
  // }
}
