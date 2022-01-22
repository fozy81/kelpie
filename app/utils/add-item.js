export function addItem(document, item) {
  function camelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function (match, group1) {
      return group1.toUpperCase();
    });
  }
  // Add item to relevant key on document object (based on model relationship)
  let key = camelCase(item.type);
  document[key] = item;

  // Add id (because?...) can't seem to access object without querying id and then accessing object
  let keyId = `${key}Id`;
  document[keyId] = item.id;
  console.log(document);
  return document;
}
