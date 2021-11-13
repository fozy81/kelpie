import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class TaskModel extends Model {
  @attr title;
  @attr description;
  @attr('string', { defaultValue: 'task' }) type;
  @attr taskTemplateId;
  @attr('boolean') archive;
  @attr('date') createdDate;
  @attr('number') createdDateValue;
  @attr('date') modifiedDate;
  @attr('number') modifiedDateValue;
  @attr('string') rev;
  @attr('string', { defaultValue: '' }) taskId;
  @attr('string', { defaultValue: '' }) taskMainId;
  @attr('string', { defaultValue: '' }) taskLevelId;
  @belongsTo container;
  @belongsTo project;
  @hasMany forms;
  @belongsTo taskTemplate;
}
