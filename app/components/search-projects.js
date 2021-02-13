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
        let dayPlusOne = ("0" + (now.getDate() + 1)).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let date = now.getFullYear() + "-" + (month) + "-" + (dayPlusOne);
        this.date = date
    }

    @service store;
    @tracked date = ''
    @action
    defaultDate() {

        let now = new Date();
        let dayPlusOne = ("0" + (now.getDate() + 1)).slice(-2);
        let month = ("0" + (now.getMonth() + 1)).slice(-2);
        let date = now.getFullYear() + "-" + (month) + "-" + (dayPlusOne);
        // today = Date(today).valueOf;
        this.date = date

    }


    @tracked search = ''
    @tracked results = null
    @action
    filter() {

        if (this.date === '') {
            let now = new Date();
            let dayPlusOne = ("0" + (now.getDate() + 1)).slice(-2);
            let monthplusone = ("0" + (now.getMonth() + 1)).slice(-2);
            let date = now.getFullYear() + "-" + (monthplusone) + "-" + (dayPlusOne);
            this.date = date
        }

        let date = new Date(this.date);
        date = date.valueOf()
        console.log('searh term: ' + this.search)
        console.log('search date: ' + date)
        let regexp = new RegExp(this.search, 'i');        
        function error(reason) {
            console.log(reason) // handle the error
            return
          }
        let regexp_couchdb = this.search;    
        
        // let result = this.store.query('project', {
        //     filter: {
        //         title: { '$regex': regexp },
        //         dueDateValue: { '$lte': date }
        //     },
        //     sort: [
        //         { dueDateValue: 'desc' }
        //     ],
        //     limit: 10
        // })
        //     this.results = result
  
    // couchdb regrex!
       let result = this.store.query('project', {
            filter: {
                title: { '$regex': regexp_couchdb },
                dueDateValue: { '$lte': date },
                archive: { '$eq': false }
            },
            sort: [
                { dueDateValue: 'desc' }
            ],
            limit: 10
        })
            this.results = result
  

    }

    @tracked recent = null
    @action
    recentFilter() {
        let recent = this.store.query('project', {
            filter: {
                title: { '$gte': null },
                projectId: { '$gte': null },
                createdDateValue: { '$gte': null },
                archive: { '$eq': false }
            },
            sort: [
                { createdDateValue: 'desc' }
            ],
            limit: 3
        })
        this.recent = recent
    }
}
