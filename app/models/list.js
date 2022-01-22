import Model, { attr } from '@ember-data/model';

export default class ListModel extends Model {
  @attr name;
  @attr title;
  @attr description;
  @attr('string', { defaultValue: 'list' }) type;
  @attr('boolean') archive;
  @attr('date') createdDate;
  @attr('number') createdDateValue;
  @attr('date') modifiedDate;
  @attr('number') modifiedDateValue;
  @attr('string') rev;
}
