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
            task: task
          })
          form
            .save()
            .then(addResponse)
            .catch(failure);

        }

        function addResponse(form) {          
          let response = store.createRecord('response', {
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


    // })  



    // this.store.push({
    //   data: {
    //     id: '1',
    //     type: 'project',
    //     attributes: {
    //       title: 'Example project',
    //       description: 'Showcasing some features'
    //     },
    //     relationships: {
    //       tasks: {
    //         data: [
    //           {
    //             id: '2',
    //             type: 'task'
    //           },
    //           {
    //             id: '3',
    //             type: 'task'
    //           },
    //           {
    //             id: '4',
    //             type: 'task'
    //           }
    //         ]
    //       }
    //     }
    //   },
    //   included: [
    //     {
    //       id: '2',
    //       type: 'task',
    //       attributes: {
    //         title: 'Field Site 1'
    //       },
    //       relationships: {
    //         forms: {
    //           data: [
    //             {
    //               id: '5',
    //               type: 'form'
    //             }]
    //         }
    //       }
    //     },
    //     {
    //       id: '3',
    //       type: 'task',
    //       attributes: {
    //         title: 'Woodlands site 2'
    //       }
    //     },
    //     {
    //       id: '4',
    //       type: 'task',
    //       attributes: {
    //         title: 'Shoreline Site 3'
    //       }
    //     },
    //     {
    //       id: '5',
    //       type: 'form',
    //       attributes: {
    //         title: 'Wildlife',
    //         description: 'Record wildlife species observed'
    //       },
    //       relationships: {
    //         responses: {
    //           data: [
    //             {
    //               id: '6',
    //               type: 'response'
    //             }]
    //         }
    //       }
    //     },
    //     {
    //       id: '6',
    //       type: 'response',
    //       attributes: {
    //         question: 'Species',
    //         response: '',
    //         multiEntry: true,
    //         type: 'select',
    //         rep: 1
    //       }
    //     }
    //   ]
    // })


    // this.store.push({
    //   data: {
    //     id: '7',
    //     type: 'template',
    //     attributes: {
    //       title: 'Wildlife',
    //       description: 'Record wildlife species'
    //     },
    //     relationships: {
    //       actions: {
    //         data: [
    //           {
    //             id: '8',
    //             type: 'action'
    //           }
    //         ]
    //       }
    //     }
    //   },
    //   included: [
    //     {
    //       id: '8',
    //       type: 'action',
    //       attributes: {
    //         question: 'Species',
    //         response: '',
    //         multiEntry: true,
    //         type: 'select',
    //         rep: '1'
    //       }
    //     }]
    // }).save();


    // return this.store.findAll('project', 1);


    //     }
    //   });
    //   }
    // }
  }
}