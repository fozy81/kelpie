import Model, { attr, belongsTo }  from '@ember-data/model';

export default class ActionModel extends Model {
   
    @attr question;
    @attr response;
    @attr multiEntry;
    @attr type;
    @attr rep;
    @attr('string') rev;  
    @belongsTo formTemplate;

}
