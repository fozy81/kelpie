import Model, { attr, hasMany } from '@ember-data/model';

export default class TaskTemplateModel extends Model {

    @attr title;
    @attr description;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr('string') rev;
    @hasMany tasks  

}
