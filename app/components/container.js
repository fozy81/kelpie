import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class ContainerComponent extends Component {
  @tracked closed = true;

  @action
  openContainer() {
    this.closed = !this.closed;
  }
}
