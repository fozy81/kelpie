import Model, { attr } from '@ember-data/model';

export default class ContainerModel extends Model {

    @attr title;
    @attr description;
    @attr('string') rev;
}
