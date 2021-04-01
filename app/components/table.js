import Component from '@glimmer/component';


export default class TableComponent extends Component {


  // @service store;
  // @tracked data = '';
  // @action
  // query(){   
  //  let data = this.data
  //  this.store.query('project', { 
  //   filter: { 
  //     title: { $regex: 'Welcome' }
  // }
  //  }).then(function(query){   
  //       query.map(function(item) {
      
  //           console.log('model' + item )
        
         
  //       })
  //   data = query   
   
  //  })
  //  return this.data = data
  // }


  get flat(){    
    if (typeof this.args.responses  !== 'test') {
      return
   }
    let data = this.args.responses 
    let  flatArray = []
    data.map(function(project) {   
      console.log(project.title)    
        project.tasks.map(function(task) {
          task.forms.map(function(form){
            form.questions.map(function(question){                          
                flatArray.push({
                "project": project.title,
                "projectId": project.id,
                "task": task.title,
                "taskId": task.id,
                "form": form.title,
                "formId": form.templateId,
                "question": question.question,
                "response": question.response
                })   
            })   
          })
      })
    })

    return flatArray;
  }

  columns = [
    {
      name: `Project`,
      valuePath: `project`,
      cellComponent: 'table-cell'
    },
    {
      name: `Project ID`,
      valuePath: `projectId`,
      cellComponent: 'table-cell'
    },
    {
      name: `Task`,
      valuePath: `task`,
      cellComponent: 'table-cell'
    },
    {
      name: `Task ID`,
      valuePath: `taskId`,
      cellComponent: 'table-cell'
    },
    {
      name: `Form`,
      valuePath: `form`,
      cellComponent: 'table-cell'
    },
    {
      name: `Form Id`,
      valuePath: `formId`,
      cellComponent: 'table-cell'
    },
    {
      name: `Question`,
      valuePath: `question`,
      cellComponent: 'table-cell'
    },
    {
      name: `Response`,
      valuePath: `response`,
      cellComponent: 'table-cell'
    },


  ];
      


  
}
