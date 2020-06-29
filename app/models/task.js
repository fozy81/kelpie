import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class TaskModel extends Model {

    @attr title;
    @attr description;
    @attr('string') rev;  
    @belongsTo project;   
    @hasMany forms; 

}
