import Model, { attr, belongsTo } from '@ember-data/model';

export default class QuestionModel extends Model {
    
    @attr question;
    @attr response; 
    @attr multiEntry;
    @attr type;
    @attr rep;
    @attr options;
    @attr required;
    @attr('number') pos;
    @attr('number') min;
    @attr('number') max;
    @attr('string') rev;  
    @belongsTo form;
  
}
