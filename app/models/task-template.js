import Model, { attr, hasMany } from '@ember-data/model';

export default class TaskTemplateModel extends Model {

    @attr title;
    @attr description;
    @attr('number') lat;
    @attr('number') lon;
    @attr arrangeAccess;
    @attr describeAccess;
    @attr riskAssessment;
    @attr('string', { defaultValue: 'taskTemplate' }) type;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr('string') rev;
    @hasMany tasks  

}
