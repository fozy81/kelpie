import Model, { attr, belongsTo } from '@ember-data/model';

export default class QuestionTemplateModel extends Model {

    @attr question;
    @attr response;
    @attr multiEntry;
    @attr type;
    @attr rep;
    @attr('number') pos;
    @attr('number') max;
    @attr('number') min;
    @attr('string') rev;  
    @attr options;
    @attr required;
    @belongsTo formTemplate;

}
