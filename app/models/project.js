import Model, { attr, hasMany } from '@ember-data/model';

export default class ProjectModel extends Model {

    @attr title;
    @attr description;
    @attr('date') startDate;
    @attr('string') rev;  
    @hasMany tasks;

}
