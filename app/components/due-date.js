import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class DueDateComponent extends Component {
  @service store;
  @tracked showDatePicker = false;
  @action
  showDate() {
    this.showDatePicker = !this.showDatePicker;
  }

  @action
  save(event) {
    console.log('Date: ' + event.target.value);
    let date = event.target.value;
    if (date === null) {
      return;
    }
    let dateTest = new Date(date);
    let dateValue = dateTest.valueOf();
    let id = this.args.id;
    this.store.findRecord('project', id).then(function (project) {
      project.dueDate = dateTest;
      project.dueDateValue = dateValue;
      project.save();
    });

    this.showDate();
  }
}
