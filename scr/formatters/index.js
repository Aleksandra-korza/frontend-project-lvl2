import stylish from '../formatters/stylish.js';
import plain from '../formatters/plain.js';
import json from '../formatters/json.js';

const selectFormat = (diffArr, style) => {
  if (style === 'plain') {
    return plain(diffArr);
  }
  if (style === 'json') {
    return json(diffArr);
  }
  return stylish(diffArr);
};

export default selectFormat;