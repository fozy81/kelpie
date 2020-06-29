import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service'

export default class MenuComponent extends Component {

 @tracked show = false;
 

@action 
showCard() {
  console.log("showCard") 
   this.show = true  
  }

}