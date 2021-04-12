import { Factory } from 'ember-cli-mirage';

export default Factory.extend({
  question(i) {
    let questions = ['Species', 'Abundance'];
    questions = questions[i % 2];
    return questions;
  },

  response(i) {
    let responses = '';
    return responses;
  },

  multiEntry(i) {
    let multi = [true, true];
    multi = multi[i % 2];
    return multi;
  },

  type(i) {
    let types = ['input', 'input'];
    types = types[i % 2];
    return types;
  },

  rep() {
    return 1;
  },
});
