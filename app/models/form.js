import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class FormModel extends Model {
  @attr title;
  @attr description;
  @attr('string', { defaultValue: 'form' }) type;
  @attr edit;
  @attr('boolean', { defaultValue: false }) newForm;
  @attr multiEntry;
  @attr templateId;
  @attr formTemplateId;
  @attr('string', { defaultValue: '' }) taskTemplateId;
  @attr display;
  @attr pos;
  @attr methodId;
  @attr methodTitle;
  @attr tags;
  @attr('boolean') archive;
  @attr('date') createdDate;
  @attr('number') createdDateValue;
  @attr('date') modifiedDate;
  @attr('number') modifiedDateValue;
  @attr('string', { defaultValue: '' }) containerId;
  @attr('string', { defaultValue: '' }) containerMainId;
  @attr('string', { defaultValue: '' }) containerLevelId;
  @belongsTo container;
  @belongsTo formTemplate;
  @belongsTo taskTemplate;
  @hasMany questions;
  @attr('string') rev; 
}
