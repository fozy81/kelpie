import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;

  @tracked error;
  @tracked password;
  @tracked identification;


  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.session.authenticate('authenticator:pouch', this.identification, this.password).then(function() {
        window.location.reload()}
      );
    } catch (error) {      
      this.error = error.reason || error;
    }
  }

  @action
  updateIdentification(e) {
    this.identification = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }

}