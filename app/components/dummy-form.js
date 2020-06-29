import Component from '@glimmer/component';
import { Changeset } from 'ember-changeset';

export default class DummyFormComponent extends Component {
    init(...args) {
        super.init(...args)
    
       
        this.changeset = Changeset(this.model, );
      }

}
