import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

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
