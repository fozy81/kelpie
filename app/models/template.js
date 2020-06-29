import Model, { attr, hasMany}  from '@ember-data/model';

export default class TemplateModel extends Model {
    @attr title;
    @attr description;
    @attr('string') rev;  
    @hasMany actions;
}
