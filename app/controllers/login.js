import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginController extends Controller {
  @service session;

  @tracked error;
  @tracked password;
  @tracked username;


  @action
  async login(event) {
    event.preventDefault();
    try {
      await this.session.authenticate('authenticator:pouch', this.username, this.password);
    } catch (error) {
      this.error = error;
    }
  }

  @action
  updateIdentification(e) {
    this.username = e.target.value;
  }

  @action
  updatePassword(e) {
    this.password = e.target.value;
  }

  @action
  authenticate(event) {
    const { target } = event;
    let identification = target.querySelector('#identification').value;
    let password = target.querySelector('#password').value;
    event.preventDefault();
    this.session.authenticate('authenticator:pouch', identification, password).then(() => {
      this.setProperties({ identification: '', password: '' });
    }).catch((reason) => {
      this.errorMessage = reason.message || reason;
    });
  }
}