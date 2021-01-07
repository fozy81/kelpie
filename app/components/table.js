import Component from '@glimmer/component';


export default class TableComponent extends Component {

  get flat(){    
    let data = this.args.responses 
    let  flatArray = []
    data.map(function(project) {       
        project.tasks.map(function(task) {
          task.forms.map(function(form){
            form.questions.map(function(question){                          
                flatArray.push({
                "task": task.title,
                "project": project.title,
                "form": form.title,
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
      name: `Task`,
      valuePath: `task`
    },
    {
      name: `Project`,
      valuePath: `project`
    },
    {
      name: `Form`,
      valuePath: `form`
    },
    {
      name: `Question`,
      valuePath: `question`
    },
    {
      name: `Response`,
      valuePath: `response`
    }

  ];
      


  
}
