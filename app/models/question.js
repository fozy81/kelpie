import Model, { attr, belongsTo } from '@ember-data/model';

export default class QuestionModel extends Model {
  @attr question;
  @attr questionTemplateId;
  @attr response;
  @attr multiEntry;
  @attr type;
  @attr required;
  @attr units;
  @attr('boolean') archive;
  @attr('number') pos;
  @attr('number') min;
  @attr('number') max;
  @attr('number') step;
  @attr default;
  @attr('string') rev;
  @belongsTo form;
  @belongsTo questionTemplate;
}
