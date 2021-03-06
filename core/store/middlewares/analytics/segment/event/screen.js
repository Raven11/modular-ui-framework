function validateScreenFields(fields: Object) {
  if (fields.category && !fields.name) {
    return new Error('missing name field for EventTypes.screen');
  }

  return null;
}

function getScreenProperties(fields: Object) {
  if (fields.category) return [ 'category', 'name', 'properties', 'options' ];
  if (!fields.name) return [ 'properties', 'options' ];

  return [ 'name', 'properties', 'options' ];
}

function extractFields(obj: Object, keys: Array) {
  return keys.map(key => key === 'properties' ? obj[key] || {} : obj[key]);
}

function extractScreenFields(fields: Object) {
  // all fields are optional for page events
  if (!fields) {
    return [];
  }

  const err = validateScreenFields(fields);
  if (err) return err;

  const props = getScreenProperties(fields);

  return extractFields(fields, props);
}


export {
  extractScreenFields,
};