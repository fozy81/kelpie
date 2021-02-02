import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class CardComponent extends Component {

    @service store
    get questionStats() {
        let forms = this.args.forms
        if(typeof(forms) == "undefined" ) {
            return
        }
        let completed = 0
        let incomplete = 0
        let completedQuestion = []
        let incompleteQuestion = []
        let stats = function(forms) {
            forms.map(function (form) {
                form.questions.map(function (question) {
                    if (question.response != '') {
                     completedQuestion.push(question)
                    } else {
                      incompleteQuestion.push(question)
                    }
                })
            })

            completed = completedQuestion.length
            incomplete = incompleteQuestion.length
            let total = completed + incomplete
            let percentage = (100 / total) * completedQuestion.length
            let complete = false
            if (percentage == 100) {
                complete = true
            }
            let text = `${Math.round(percentage)} %`
            if (isNaN(parseInt(percentage))){
                text = ''
            }        
            let stat = {
                total: total,
                percentage: percentage,
                complete: complete,
                text: text
            }
            return stat
        }
        let stat = stats(forms)
        return stat
    }

}
