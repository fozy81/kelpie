import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'kelpie/config/environment';

export default class ProjectRoute extends Route {
  // @service session;
  // beforeModel() {
  //   if (!this.session.isAuthenticated && ENV.locationType !== 'none') {
  //     this.replaceWith('login');
  //   }
  // }

  model(params) {
    return this.store.findRecord('project', params.project_id, {
      include: 'tasks.forms.questions,projectTemplate,tasks.taskTemplate',
    });
  }
}
