import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title(i) {
    let questions = ['Invert count', 'Bird Survey'];
    questions = questions[i % 2];
    return questions;
    // return faker.lorem.words(5);
  },

  description(i) {
    let descriptions = ['Invert analysis', '10min stationary bird survey'];
    descriptions = descriptions[i % 2];
    return descriptions;
  },

  afterCreate(formTemplate, server) {
    server.createList('action', 2, { formTemplate });
  },
});
