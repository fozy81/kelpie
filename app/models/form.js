import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class FormModel extends Model {

    @attr title;
    @attr description;
    @attr rep;
    @attr edit;
    @attr multiEntry; 
    @attr templateId;
    @attr display;
    @attr pos;
    @attr('date') dateCreated;
    @belongsTo task;
    @hasMany questions;
    @attr('string') rev;  


}
