import { Factory } from 'ember-cli-mirage';
import faker from 'faker';

export default Factory.extend({
  title(i) {
    let title = [
      'Site 1 - Field',
      'Site 2 - River',
      'Site 3 - Hedgerow',
      'Site 4 - Wood',
      'Site 5 - Dune',
    ];
    title = title[i % 5];
    return title;
  },

  description() {
    return faker.lorem.sentence();
  },

  afterCreate(task, server) {
    server.createList('form', 4, { task });
  },
});
