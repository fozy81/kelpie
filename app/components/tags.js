import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class TagsComponent extends Component {

    @tracked tags = false;
    @action
    showTags() {
      this.tags = !this.tags;
    }
    
    @service store;
    @action
    saveTags(id) {
      this.tags = !this.tags;
      let form = this.store.peekRecord('form', id)
      console.log('saved:' + id)
      form.save()
  
    }
  
    get arrayTags() {
    let model = this.args.model
    let tags = model.tags
    console.log(tags)
    let arrayTags = tags.split(',')
    console.log(arrayTags)
    return arrayTags
    }

}
