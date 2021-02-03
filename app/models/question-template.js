import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class QuestionTemplateModel extends Model {

    @attr question;
    @attr response;
    @attr multiEntry;
    @attr type;
    @attr('number') pos;
    @attr('number') max;
    @attr('number') min;
    @attr('number') step;
    @attr default;
    @attr options;
    @attr required;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr('string') rev;  
    @belongsTo formTemplate;
    @hasMany questions;

}
