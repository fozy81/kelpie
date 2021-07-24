import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import ENV from 'kelpie/config/environment';

export default class ProjectsRoute extends Route {
  // @service session;
  // beforeModel() {
  //   if (!this.session.isAuthenticated && ENV.locationType !== 'none') {
  //     this.replaceWith('login');
  //   }
  // }

  model() {
    let store = this.store;
    store
      .query('project', {
        filter: { title: { $gte: null }, projectId: { $gte: null } },
        limit: 20,
      })
      .then(function (projects) {
        let templates = projects.map(function (project) {
          store.findRecord('project', project.id, {
            include: 'projectTemplate',
          });
        });
        return templates;
      });
  }
}
