import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class TaskController extends Controller {

    @tracked archive = false;
    @action
    showArchive() {
      this.archive = !this.archive
    }
  
}
