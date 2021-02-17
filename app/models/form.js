import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class FormModel extends Model {

    @attr title;
    @attr description;
    @attr('string', { defaultValue: 'form' }) type;
    @attr edit;
    @attr multiEntry; 
    @attr templateId;
    @attr formTemplateId;
    @attr display;
    @attr pos;
    @attr methodId;
    @attr methodTitle;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @belongsTo task;
    @belongsTo formTemplate;
    @hasMany questions;
    @attr('string') rev;  


}
