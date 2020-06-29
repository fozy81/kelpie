import Model, { attr, belongsTo, hasMany} from '@ember-data/model';

export default class FormModel extends Model {

    @attr title;
    @attr description;
    @attr template_id;
    @attr('string') rev;  
    @belongsTo task;
    @hasMany responses;

}
