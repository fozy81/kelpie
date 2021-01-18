import Component from '@glimmer/component';

export default class FormsComponent extends Component {

  
  get uniqueForms(){ 
  let selection = this.args.forms  
  console.log(selection)
  var arr = [];
  selection.forEach(function(item){
    var i = arr.findIndex(x => x.templateId == item.templateId);
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

  
 }
