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
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr colour;
    @attr percentageComplete;
    @attr('boolean') archive;
    @attr('string') rev;  
    @hasMany tasks;
    @belongsTo projectTemplate;

}
