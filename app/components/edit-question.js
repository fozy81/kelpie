import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class EditQuestionComponent extends Component {


    @tracked showField = false;
    @action
    showInput(select) {
        this.showField = !this.showField
        console.log('showField: ' + this.showField)
        this.selectOptions(select)
    }

    @action
    focus(element) {
        element.focus();
    }


    @action
    selectOptions(selected) {
        if (selected === 'select') {
            this.selecting = 'select'
            console.log('option this.selecting: ' + this.selecting)
        }
        if (selected === 'number') {
            this.selecting = 'number'
            console.log('option this.selecting: ' + this.selecting)
        }
        if (selected === 'text') {
            this.selecting = 'text'
            console.log('option this.selecting: ' + this.selecting)
        }
        if (selected === 'checkbox') {
            this.selecting = 'checkbox'
            console.log('option this.selecting: ' + this.selecting)
        }
    }


    @tracked selecting = false;
    @action
    select(event) {

        console.log('event target value: ' + event.target.value)
        if (event.target.value === 'select') {
            this.selecting = 'select'
            console.log('option this.selecting: ' + this.selecting)
        }
        else if (event.target.value === 'number') {
            this.selecting = 'number'
        } 
        else if (event.target.value === 'checkbox') {
            this.selecting = 'checkbox'
        }
        else if (event.target.value === 'text') {
            this.selecting = 'text'
        } 
         else {
            this.selecting = false
        }

        this.args.formChange(event)
    }

    @service store;
    @action
    removeQuestion(id) {

        console.log('remove question!' + id)

        let question = this.store.peekRecord('question-template', id);
        console.log('remove question!' + question)
        question.destroyRecord()
    }


}



