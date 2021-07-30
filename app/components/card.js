import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CardComponent extends Component {
  @service store;
  get questionStats() {
    let forms = this.args.forms;
    if (typeof forms == 'undefined') {
      return;
    }
    let completed = 0;
    let incomplete = 0;
    let completedQuestion = [];
    let incompleteQuestion = [];
    let stats = function (forms) {
      forms.map(function (form) {
        form.questions.map(function (question) {
          if ((question.response != '') & (question.archive === false)) {
            completedQuestion.push(question);
          }
          if (
            (question.response == '') &
            (question.archive === false) &
            ((question.required === undefined &&
              typeof question.required == 'undefined') ||
              question.required === true)
          ) {
            incompleteQuestion.push(question);
          }
        });
      });

      completed = completedQuestion.length;
      incomplete = incompleteQuestion.length;
      let total = completed + incomplete;
      let percentage = (100 / total) * completedQuestion.length;
      let complete = false;
      if (percentage >= 100) {
        complete = true;
      }
      let text = `${Math.round(percentage)}%`;
      if (isNaN(parseInt(percentage))) {
        text = '';
      }
      console.log('text: ' + text);
      console.log('completed: ' + completed);
      console.log('incomplete: ' + incomplete);
      let stat = {
        total: total,
        percentage: percentage,
        complete: complete,
        text: text,
      };
      return stat;
    };
    let stat = stats(forms);
    return stat;
  }

  @action
  restore(id) {
    if (id.type === 'form') {
      let form = this.store.peekRecord('form', id.id, {
        include: 'form.questions',
      });

      form.questions.map(function (question) {
        question.archive = false;
        question.save();
      });
      form.archive = false;
      form.save();
    } else if (id.type === 'task') {
      let task = this.store.peekRecord('task', id.id, {
        include: 'forms.questions',
      });

      task.forms.map(function (form) {
        form.archive = false;
        form.save();
        form.questions.map(function (question) {
          question.archive = false;
          question.save();
        });
      });
      task.archive = false;
      task.save();
    } else {
      let project = this.store.peekRecord('project', id.id, {
        include: 'tasks.forms.questions',
      });

      project.tasks.map(function (task) {
        task.archive = false;
        task.save();
        task.forms.map(function (form) {
          form.archive = false;
          form.save();
          form.questions.map(function (question) {
            question.archive = false;
            question.save();
          });
        });
      });
      project.archive = false;
      project.save();
    }
  }

  @tracked showCard = true;
  @action
  showingCard() {
    this.showCard = !this.showCard;
  }
}
