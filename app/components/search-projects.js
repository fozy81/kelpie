import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service'


export default class SearchProjectsComponent extends Component {

    @action
    focus(element) {
        element.focus();
    }

    @tracked show = false
    @action
    showSearch() {

        this.show = !this.show
        this.search = ''
        let now = new Date();
        let day = ("0" + now.getDate()).slice(-2);
        let monthplusone = ("0" + (now.getMonth() + 2)).slice(-2);
        let todayplusmonth = now.getFullYear() + "-" + (monthplusone) + "-" + (day);
        this.date = todayplusmonth
    }

    @service store;
    @tracked date = ''
    @action
    defaultDate() {

        let now = new Date();
        let day = ("0" + now.getDate()).slice(-2);
        let month = ("0" + (now.getMonth() + 2)).slice(-2);
        let today = now.getFullYear() + "-" + (month) + "-" + (day);
        this.date = today
    }


    @tracked search = ''
    @tracked results = null
    @action
    filter() {

        if (this.date === '') {
            let now = new Date();
            let day = ("0" + now.getDate()).slice(-2);
            let month = ("0" + (now.getMonth() + 2)).slice(-2);
            let today = now.getFullYear() + "-" + (month) + "-" + (day);
            this.date = today
        }
        console.log(this.search)

        let regexp = new RegExp(this.search, 'i');
      
        let result = this.store.query('project', {
            filter: {
                title: { '$regex': regexp }, 
                startDate: { '$lte': this.date },
                projectId: { '$gte': null }
            },
            limit: 20
        })
        this.results = result

    }

    @tracked recent = null
    @action
    recentFilter() {

        let recent = this.store.query('project', {
            filter: {
                title: { '$gte': null },
                projectId: { '$gte': null }
            },
            sort: [
                { projectId: 'asc' }
            ],
            limit: 3
        })

        this.recent = recent

    }

}