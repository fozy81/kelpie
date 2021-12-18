import Model, { attr, hasMany } from '@ember-data/model';

export default class ContainerTemplateModel extends Model {
  @attr title;
  @attr description;
  @attr('string', { defaultValue: 'container-template' }) type;
  @attr('boolean', { defaultValue: false }) archive;
  @attr('string') rev;
  @hasMany formTemplates;
}
