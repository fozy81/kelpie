import Model, { attr, hasMany, belongsTo } from '@ember-data/model';

export default class ProjectModel extends Model {

    @attr title;
    @attr description;
    @attr projectId;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') startDate;
    @attr('date') dueDate;
    @attr('number') dueDateValue;
    @attr colour;
    @attr('string') rev;  
    @hasMany tasks;
    @belongsTo projectTemplate;

}
