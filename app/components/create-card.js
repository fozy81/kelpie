import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class CreateCardComponent extends Component {
  
  @action
  focus(element) {
    element.focus();
  }

    @tracked show = false;
    @action
    showCard() {

        this.show = !this.show
               
    }

    @tracked newName;
    @service router;
    @service store; 
    @action
    createCard() {  
        const router = this.router  
        let model = null
         if(this.args.modelName == null) {
            model = router.currentRoute.attributes.modelName
          } else {
            model = this.args.modelName
        }
        if(model == "project") {
          this.store.createRecord(model, {
          title: this.newName      
        }).save().then(function(record) {   
        const path = '/' + router.currentRoute.name + '/' + record.id           
        router.transitionTo(path);
        })
    }
    if(model == "task") {
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
             .catch(failure);
    }  
    
    if(model == "form") {
        const id = router.currentRoute.params.task_id  
             
        let myTask = this.store.peekRecord('task', id);
          let template = this.store.createRecord('template', {
            title: this.newName                      
          }).save()

         
          this.store.createRecord(model, {
              title: this.newName,
              task: myTask,
              template_id: template.id
            }).save()
        
           this.show = !this.show
     } 

    this.newName = "" 
  }


  @action
  addTemplate(id) {   
    const router = this.router   
    const taskId = router.currentRoute.params.task_id          
    let myTask = this.store.peekRecord('task', taskId);    
    let template = this.store.peekRecord('template', id);
    const store = this.store
    let formRecord = this.store.createRecord('form', {
           title: template.title,
           description: template.description,
           task: myTask }
           )
           formRecord.save().then(function(form) {             
            let responses =  template.actions
            let myForm = store.peekRecord('form', form.id );
            responses.map(function(action) {    
              let response =  store.createRecord('response', {
                question: action.question,
                response: action.response,
                rep: 1,
                multiEntry: action.multiEntry,
                type: action.type,
                form: myForm
      })
      response.save()  
    })
  })
    
  
    this.show = !this.show
    }  
}