import EmberRouter from '@ember/routing/router';
import config from 'kelpie/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('projects');

  this.route('project', {
    path: 'projects/:project_id',
  });

  this.route('task', {
    path: 'task/:task_id',
  });
  this.route('responses');
  this.route('login');
  this.route('scan');
  this.route('print');
});
