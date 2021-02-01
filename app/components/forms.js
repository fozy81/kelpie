import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';


export default class FormsComponent extends Component {

  
  get uniqueForms(){ 
  let selection = this.args.forms  
  console.log(selection)
  var arr = [];
  selection.forEach(function(item){
    var i = arr.findIndex(x => x.formTemplateId == item.formTemplateId);
    if(i <= -1){
      arr.push({id: item.id, templateId: item.templateId});
    }
  });

  arr = arr.map(function(item) {
      return item.id
  }) 
  console.log(arr);  
  
  const found = selection.filter(el => arr.includes(el.id));
   console.log(found)
 
  return(found)
  }

  get dateOrderForms(){     
    let forms = this.args.forms; 
    let sorted = forms.sortBy(toString('dateCreated')).reverse()    
    return sorted     
    }

   @tracked editMethodTemplate = false
   @tracked methodTemplateId = false
   @action
   editingTemplate(id) {
     this.editMethodTemplate = !this.editMethodTemplate 
    console.log('editing action status: ' + this.editMethodTemplate)
    this.methodTemplateId = id
    console.log('editing action method TemplateId: ' + this.methodTemplateId)
   }

  
 }
