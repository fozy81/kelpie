import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  @service session;
  beforeModel() {
    // if (this.session.isAuthenticated) {
    this.replaceWith('projects');
    // } else {
    //   this.replaceWith('login');
    // }
  }
  // beforeModel(transition) {
  //   this.get('session').requireAuthentication(transition, 'login');
  //   }
}
