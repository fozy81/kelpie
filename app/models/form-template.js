import Model, { attr, hasMany } from '@ember-data/model';

export default class FormTemplateModel extends Model {
    @attr title;
    @attr description;
    @attr('string', {defaultValue: 'form-template'}) type;
    @attr rep;
    @attr edit;
    @attr multiEntry;  
    @attr('boolean') archive;   
    @hasMany questionTemplates;
    @attr('string') rev;  
}
