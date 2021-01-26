import Model, { attr, hasMany } from '@ember-data/model';

export default class ProjectModel extends Model {

    @attr title;
    @attr description;
    @attr projectId;
    @attr('date') createdDate;
    @attr('date') startDate;
    @attr('date') dueDate;
    @attr colour;
    @attr('string') rev;  
    @hasMany tasks;

}
