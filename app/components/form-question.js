import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class FormQuestionComponent extends Component {

  @tracked showField = true;
  @action
  showInput() {      
        
        this.showField = !this.showField    
        console.log(this.showField)

  }

  @action
  save(event) {      
        
    this.args.addSelections(event)
    this.showInput()

  }



  @tracked value = this.args.value; 
  @action
  cancel(event) {
    console.log(event)
    if(event.target == null){
      this.value = event.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value
      this.showInput()
    } else{
     console.log(event.target.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value)
     this.value = event.target.parentElement.childNodes[1].attributes[1].ownerElement.attributes[2].value
     this.showInput()
    }
    console.log(this.value)
  }

  @action
  focus(element) {
    console.log(this.args.index)
    if(this.args.index == 0) {
    element.focus();
    }
  }

}