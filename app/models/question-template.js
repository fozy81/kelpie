import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class QuestionTemplateModel extends Model {

    @attr question;
    @attr response;
    @attr multiEntry;
    @attr type;
    @attr rep;
    @attr('number') pos;
    @attr('number') max;
    @attr('number') min;
    @attr('number') step;
    @attr default;
    @attr('string') rev;  
    @attr options;
    @attr required;
    @belongsTo formTemplate;
    @hasMany questions;

}
