import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { inject as service } from '@ember/service';


export default class TaskController extends Controller {

  @tracked archive = false;
  @action
  showArchive() {
    this.archive = !this.archive
  }

  @tracked showDetails = false;
  @action
  showMore() {
    this.showDetails = !this.showDetails
  }

  @tracked lat = null;
  @tracked lon = this.model.task.lon;

  get geoFindMe() {
    function getCurrentPosition(options = {}) {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, options);
      });
    }

    const fetchCoordinates = async () => {
      try {
        const { coords } = await getCurrentPosition();
        return coords
        // Handle coordinates
      } catch (error) {
        // Handle error
        console.error(error);
      }
    };

    return fetchCoordinates().then(function (value) {
      console.log(value)
      return value
    })

  }

  @action
  saveTask(id){
     let taskTemplate = this.store.peekRecord('task-template', id)
     taskTemplate.save()
     this.showDetails = !this.showDetails
  }


}
