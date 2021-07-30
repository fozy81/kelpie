import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';

export default class EditFormComponent extends Component {
  @service store;

  @action
  stopEditing() {
    this.args.edit();
  }

  @tracked selectedOptions = [];
  @action
  formChange(event) {
    let selection = {
      id: event.target.id,
      value: event.target.value,
      name: event.target.name,
      nameid: `event.target.name + event.target.id`,
    };
    console.log('name:' + event.target.name);
    console.log('selection:' + selection.id);
    if (this.selectedOptions.length === 0) {
      this.selectedOptions.push(selection);
    } else {
      // eslint-disable-next-line no-inner-declarations
      function changeDesc(value, nameid, selectedOptions) {
        let found = false;
        for (var i = 0; i < selectedOptions.length; i++) {
          if (selectedOptions[i].nameid === nameid) {
            selectedOptions[i].value = value;
            //break; Stop this loop, we found it!
            found += true;
          }
        }
        if (found === false) {
          selectedOptions = selectedOptions.push(selection);
        }
        return selectedOptions;
      }
      let selectedOptions = this.selectedOptions;
      let options = changeDesc(
        event.target.value,
        event.target.id,
        selectedOptions
      );
      this.selectedOptions = selectedOptions;
    }
  }

  @service router;
  @action
  saveForm() {
    // event.preventDefault();
    // console.log(this.args.forms);
    // let formTemplateId = this.args.forms.formTemplate.id;
    // this.store
    //   .findRecord('form-template', formTemplateId)
    //   .then(function (formTemplate) {
    //     formTemplate.save();
    //   });

    console.log('saveForm');
    // event.preventDefault()
    let store = this.store;
    let selectedOptions = this.selectedOptions;
    //save form template
    let formTemplateId = this.args.forms.formTemplate.get('id');
    console.log('formTempalteID really ' + formTemplateId);
    store
      .findRecord('form-template', formTemplateId, {
        include: 'questionTemplates',
      })
      .then(function (formTemplate) {
        // convert checkbox string to boolean
        if (
          (formTemplate.multiEntry === 'true') |
          (formTemplate.multiEntry === true)
        ) {
          formTemplate.multiEntry = true;
        } else {
          formTemplate.multiEntry = false;
        }
        console.log('multientry check: ' + formTemplate.multiEntry);
        formTemplate.save().then(function (formTemplates) {
          // For question type 'dropdown' select options:
          let questionTemplates = formTemplates.questionTemplates;
          questionTemplates.map(function (question, index) {
            store
              .findRecord('question-template', question.id)
              .then(function (questionTemplate) {
                // console.log('selectedOptions: ' + selectedOptions[index].value )
                console.log('question map');
                selectedOptions.map(function (selected) {
                  console.log('selected id: ' + selected.id);
                  console.log('questionTemplate id: ' + questionTemplate.id);
                  if (
                    selected.id == questionTemplate.id &&
                    selected.name == 'type'
                  ) {
                    questionTemplate.type = selected.value;
                  }
                  if (
                    selected.id == questionTemplate.id &&
                    selected.name == 'units'
                  ) {
                    console.log('units: ' + selected.value);
                    questionTemplate.units = selected.value;
                  }
                });
                questionTemplate.response = '';
                questionTemplate.save();
              });
          });
        });
      });
  }

  @action
  deleteForm() {
    console.log('delete form');
    const id = this.args.forms.id;
    let form = this.store.peekRecord('form', id, {
      include: 'form.questions',
    });

    form.questions.map(function (question) {
      question.destroyRecord();
    });
    form.destroyRecord();
  }

  @action
  deleteFormAndTemplate() {
    let store = this.store;
    let formTemplateId = this.args.forms.formTemplate.get('id');
    let formTemplate = store.peekRecord('form-template', formTemplateId);
    formTemplate.destroyRecord();
    this.deleteForm();
  }

  @action
  saveFormTemplateDeleteForm() {
    this.saveForm();
    this.deleteForm();
  }

  @action
  saveFormStopEditing() {
    this.saveForm();
    this.args.edit();
  }

  @action
  saveReplaceForm(event) {
    console.log('saveReplaceForm: ');
    // event.preventDefault()
    let router = this.router;
    let store = this.store;
    // let selectedOptions = this.selectedOptions;
    let args = this.args;
    this.saveForm();
    //save form template
    // let formTemplateId = this.args.forms.formTemplate.get('id');
    // console.log('formTempalteID really ' + formTemplateId);
    // store
    //   .findRecord('form-template', formTemplateId, {
    //     include: 'questionTemplates',
    //   })
    //   .then(function (formTemplate) {
    //     // convert checkbox string to boolean
    //     if (
    //       (formTemplate.multiEntry === 'true') |
    //       (formTemplate.multiEntry === true)
    //     ) {
    //       formTemplate.multiEntry = true;
    //     } else {
    //       formTemplate.multiEntry = false;
    //     }
    //     console.log('multientry check: ' + formTemplate.multiEntry);
    //     formTemplate.save().then(function (formTemplates) {
    //       // For question type 'dropdown' select options:
    //       let questionTemplates = formTemplates.questionTemplates;
    //       questionTemplates.map(function (question, index) {
    //         store
    //           .findRecord('question-template', question.id)
    //           .then(function (questionTemplate) {
    //             // console.log('selectedOptions: ' + selectedOptions[index].value )
    //             console.log('question map');
    //             selectedOptions.map(function (selected) {
    //               console.log('selected id: ' + selected.id);
    //               console.log('questionTemplate id: ' + questionTemplate.id);
    //               if (
    //                 selected.id == questionTemplate.id &&
    //                 selected.name == 'type'
    //               ) {
    //                 questionTemplate.type = selected.value;
    //               }
    //               if (
    //                 selected.id == questionTemplate.id &&
    //                 selected.name == 'units'
    //               ) {
    //                 console.log('units: ' + selected.value);
    //                 questionTemplate.units = selected.value;
    //               }
    //             });
    //             questionTemplate.response = '';
    //             questionTemplate.save();
    //           });
    //       });
    //     });
    //   })
    //.then(function () {
    let formId = args.forms.id;
    let formTemplateId = this.args.forms.formTemplate.get('id');
    let form = store.peekRecord('form', formId);
    form.destroyRecord();
    // add new form
    const taskId = router.currentRoute.params.task_id;
    console.log(taskId);
    let myTask = store.peekRecord('task', taskId);
    store
      .findRecord('form-template', formTemplateId)
      .then(function (formTemplate) {
        let formRecord = store.createRecord('form', {
          title: formTemplate.title,
          description: formTemplate.description,
          edit: false,
          multiEntry: formTemplate.multiEntry,
          createdDate: new Date(),
          createdDateValue: new Date().valueOf(),
          templateId: myTask.id,
          formTemplateId: formTemplate.id,
          formTemplate: formTemplate,
          task: myTask,
          taskTemplateId: formTemplate.taskTemplateId,
          taskTemplate: formTemplate.taskTemplate,
          display: false,
        });
        formRecord.save().then(function (form) {
          console.log(form.templateId);
          let questionTemplates = formTemplate.get('questionTemplates');
          let myForm = form; //store.peekRecord('form', form.id);
          questionTemplates.map(function (questionTemplate) {
            console.log('question: ' + questionTemplate.question);
            console.log('multi-entry? : ' + myForm.multiEntry);
            let response = '';
            if (questionTemplate.default) {
              response = questionTemplate.default;
            }
            let question = store.createRecord('question', {
              question: questionTemplate.question,
              questionTemplate: questionTemplate,
              questionTemplateId: questionTemplate.id,
              response: response,
              multiEntry: myForm.multiEntry,
              type: questionTemplate.type,
              units: questionTemplate.units,
              pos: questionTemplate.pos,
              required: questionTemplate.required,
              min: questionTemplate.min,
              max: questionTemplate.max,
              step: questionTemplate.step,
              default: questionTemplate.default,
              form: myForm,
            });
            question.save();
          });
          myForm.save();
        });
      });

    //   });

    // remove existing formlet questionTemplates = formTemplate.questionTemplates

    // stop showing edit menu
    this.args.edit();
  }

  @tracked showthis = false;

  @action
  addQuestion() {
    let formTemplateId = this.args.forms.formTemplate.get('id');
    console.log(formTemplateId);
    let formTemplate = this.store.peekRecord('form-template', formTemplateId);
    let questions = formTemplate.questionTemplates;
    let position = questions.length + 1;

    let newQuestion = this.store.createRecord('question-template', {
      multiEntry: false,
      pos: position,
      formTemplate: formTemplate,
    });

    newQuestion.save().then(console.log('question?' + newQuestion.question));
    this.showthis = true;
  }

  @action
  focus(element) {
    element.focus();
  }

  @tracked showField = '';
  @action
  showInput(index) {
    this.showField = index;
    console.log(this.showField);
  }

  @action
  removeFormTemplate(id) {
    console.log('remove question!' + id);

    let form = this.store.peekRecord('form-template', id);
    console.log('remove question!' + form);
    if (form.archive === true) {
      form.archive = false;
    } else {
      form.archive = true;
    }
    form.save();
    this.args.edit();
  }
}
