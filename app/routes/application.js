import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class ApplicationRoute extends Route {

  model() {

    let store = this.store
     
      // const projects = store.findRecord('project', 1).then(function(projects){
      //   console.log(projects.id)
      //   return projects.id

      // }).then(function(id){
        let projects = this.store.query('project',  {
          filter: { title: 'Welcome Project' }
        }).then(function(project) {
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
        .catch(failure); 

        let myProject = store.peekRecord('project', project.id)

       let task = store.createRecord('task', {          
          title: 'Woodlands site',
          description: 'Woods',
          project: myProject
        })
        task  
        .save()
        .catch(failure); 

        

        // }
       //return store.findAll('project', 1);
        // })
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