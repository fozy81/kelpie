import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class TaskModel extends Model {

    @attr title;
    @attr description;
    @attr('number') lat;
    @attr('number') lon;
    @attr arrangeAccess;
    @attr describeAccess;
    @attr riskAssessment;
    @attr('string', { defaultValue: 'task' }) type;
    @attr taskTemplateId;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr('string') rev;  
    @belongsTo project;   
    @hasMany forms; 
    @belongsTo taskTemplate;

}
