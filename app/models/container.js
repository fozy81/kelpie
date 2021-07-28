import Model, { attr } from '@ember-data/model';

export default class ContainerModel extends Model {
  @attr title;
  @attr description;
  @attr('string', { defaultValue: 'container' }) type;
  @attr('boolean', { defaultValue: false }) archive;
  @attr('string') rev;
}
