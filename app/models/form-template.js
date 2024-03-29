import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class FormTemplateModel extends Model {
  @attr title;
  @attr description;
  @attr('string', { defaultValue: 'form-template' }) type;
  @attr rep;
  @attr edit;
  @attr multiEntry;
  @attr('boolean') archive;
  @attr('date') createdDate;
  @attr('number') createdDateValue;
  @attr('date') modifiedDate;
  @attr('number') modifiedDateValue;
  @attr('string') rev;
  @attr containerTemplateId;
  @hasMany questionTemplates;
  @hasMany forms;
  @belongsTo containerTemplate;
}
