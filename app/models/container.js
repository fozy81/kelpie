import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ContainerModel extends Model {
  @attr title;
  @attr description;
  @attr('date') createdDate;
  @attr('number') createdDateValue;
  @attr('string', { defaultValue: 'container' }) type;
  @attr('boolean', { defaultValue: false }) archive;
  @attr('string') rev;
  @hasMany forms;
  @belongsTo task;
}
