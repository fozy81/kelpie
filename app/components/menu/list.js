import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class MenuListComponent extends Component {

   @tracked show = true;
   @action 
   hideCard() {  
      this.show = false   
   }

   @tracked count = 1;
   @action 
   removeCard() {   
     if(this.count > 1) {
       this.show = false
    }
    this.count += 1
  }

}
