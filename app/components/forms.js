import Component from '@glimmer/component';

export default class FormsComponent extends Component {

  
  get uniqueForms(){ 
  let selection = this.args.forms  
  console.log(selection)
  var arr = [];
  selection.forEach(function(item){
    var i = arr.findIndex(x => x.title == item.title);
    if(i <= -1){
      arr.push({id: item.id, title: item.title});
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

}
