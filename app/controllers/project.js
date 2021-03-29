import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class ProjectController extends Controller {

    @tracked archive = false;
    @action
    showArchive() {
      this.archive = !this.archive
    }

    @tracked date = new Date().valueOf() - 15000
    @action
    archiveDate(){
      this.date = new Date().valueOf() - 15000
    
    }

}
