import Model, { attr }  from '@ember-data/model';

export default class ProjectTemplateModel extends Model {

    @attr title;
    @attr description;
    @attr('date') startDate;
    @attr('string') rev;  

}
