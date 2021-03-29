import Model, { attr, hasMany } from '@ember-data/model';

export default class TaskTemplateModel extends Model {

    @attr title;
    @attr description;
    @attr('number') lat;
    @attr('number') lon;
    @attr distanceFromSource;
    @attr altitude;
    @attr slope;
    @attr discharge;
    @attr alkalinity;
    @attr arrangeAccess;
    @attr describeAccess;
    @attr riskAssessment;
    @attr('string', { defaultValue: 'task-template' }) type;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr('string') rev;
    @hasMany tasks;  
    @hasMany forms;

}
