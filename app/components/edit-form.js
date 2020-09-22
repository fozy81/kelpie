import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class EditFormComponent extends Component {



 @tracked title = this.args.form.title
 @service store
 @action
 saveForm(){  
     
 

    event.preventDefault()
    console.log(this.args.forms)
    let newTitle = this.title
    let templateId = this.args.form.id
   this.store.findRecord('form-template', templateId).then(function(template) {
       template.title = newTitle;  
       template.save();  
   })
   
   this.title = newTitle
   console.log(this.title)
   // stop showing edit menu
     this.args.edit()
 }

}
