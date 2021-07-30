import Component from '@glimmer/component';

export default class FormQuestionFilterComponent extends Component {
  get questions() {
    let questions = this.args.get('questions');
    let sorted = questions.sortBy('pos');
    return sorted;
  }
}
