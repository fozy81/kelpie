import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class FormsComponent extends Component {
  get uniqueForms() {
    let selection = this.args.forms;
    var arr = [];
    selection = selection.sortBy('archive');
    selection.forEach(function (item) {
      var i = arr.findIndex((x) => x.formTemplateId == item.formTemplateId);
      if (i <= -1) {
        arr.push({ id: item.id, formTemplateId: item.formTemplateId });
      }
    });

    arr = arr.map(function (item) {
      return item.id;
    });

    const found = selection.filter((el) => arr.includes(el.id));

    return found;
  }

  get dateOrderForms() {
    let forms = this.args.forms;
    let sorted = forms.sortBy(toString('dateCreated')).reverse();
    return sorted;
  }

  @tracked editMethodTemplate = false;
  @tracked methodTemplateId = false;
  @action
  editingTemplate(id) {
    this.editMethodTemplate = !this.editMethodTemplate;
    console.log('editing action status: ' + this.editMethodTemplate);
    this.methodTemplateId = id;
  }

  @tracked date = new Date().valueOf() - 15000;
  @action
  archiveDate() {
    this.date = new Date().valueOf() - 15000;
  }
}
