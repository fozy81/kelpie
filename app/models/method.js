import Model, { attr } from '@ember-data/model';

export default class MethodModel extends Model {

    @attr title;
    @attr description;
    @attr body;
    @attr formTemplates;
    @attr('string', {defaultValue: 'method'}) type;
    @attr('boolean') archive;
    @attr('date') createdDate;
    @attr('number') createdDateValue;
    @attr('date') modifiedDate;
    @attr('number') modifiedDateValue;
    @attr('string') rev;  

}
