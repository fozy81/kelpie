import Model from '@ember-data/model';

export default class MethodModel extends Model {

    @attr title;
    @attr description;
    @attr body;
    @attr forms;
    @attr('string') rev;  

}
