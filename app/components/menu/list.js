import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class MenuListComponent extends Component {

   @tracked show = true;
   @action 
   hideMenuList() {  
      this.show = false   
   }

   @tracked count = 1;
   @action 
   removeMenuList() {   
     if(this.count > 1) {
       this.show = false
    }
    this.count += 1
  }

  @service store
  @service router
  @action
  removeProject() {
    
    const id = this.router.currentRoute.params.project_id
    console.log(id)
    let project = this.store.peekRecord('project', id);
    console.log(project)
    project.destroyRecord()
    const path = '/projects'        
    this.router.transitionTo(path);

  }

  @action
  removeTask() {
    
    const id = this.router.currentRoute.params.task_id    
    let task = this.store.peekRecord('task', id, {
      include: 'project'
    })   
   
    task.destroyRecord()
    const projectId = this.args.id
    const path = '/projects/' + projectId        
    this.router.transitionTo(path);

  }

  @action
  removeForm() {    
    const id = this.args.id    
    let form = this.store.peekRecord('form', id, {
      include: 'project'
    })      
    form.destroyRecord()   

  }

}
