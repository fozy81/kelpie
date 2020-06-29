import { Model, belongsTo, hasMany } from "ember-cli-mirage";

export default Model.extend({
  task: belongsTo(),
  responses: hasMany()
});

