import Model, { attr, hasMany } from '@ember-data/model';

export default class TaskTemplateModel extends Model {

    @attr title;
    @attr description;
    @attr('string') rev;
    @hasMany tasks  

}
