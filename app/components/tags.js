import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TagsComponent extends Component {

    @tracked tags = false;
    @action
    showTags() {
      this.tags = !this.tags;
    }
    
    
    @action
    saveTags(id) {
      this.tags = !this.tags;
      let form = this.store.peekRecord('form', id)
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
