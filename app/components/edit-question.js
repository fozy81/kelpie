import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class EditQuestionComponent extends Component {


    @tracked showField = false;
    @action
    showInput(select) {
          this.showField = !this.showField 
          console.log(this.showField)
          this.selectOptions(select)
    }

    @action
    focus(element) {
      element.focus();
    }

    @tracked selecting = false;
    @action
    selectOptions(selected) {
        console.log('selectedOptions')
        console.log(selected)
        if(selected && selected === 'select'){
            this.selecting = !this.selecting
        } else if (selected){
            this.selecting == false
        } else {
            console.log('no parameter')
        this.selecting = !this.selecting
        }
    }


 @tracked selecting = false;
 @action
 select(event) {
    if(event.target.value === 'select') {
   this.selecting = !this.selecting
   console.log('selecting' + this.selecting)
    } else {
        this.selecting = false
    }

   this.args.formChange(event)
 }



  

}



