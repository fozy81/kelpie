import Model, { attr, belongsTo, hasMany} from '@ember-data/model';

export default class FormModel extends Model {

    @attr title;
    @attr description;
    @attr templateId;
    @attr('string') rev;  
    @belongsTo task;
    @hasMany responses;

}
