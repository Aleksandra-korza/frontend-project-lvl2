import selectFormat from './formatters/index.js';
import takeData from './formatters/parses.js';
import buildNewObj from './formatters/buildNewObj.js';

function gendiff(file1, file2, format) {
  const object1 = takeData(file1);
  const object2 = takeData(file2);

  const tree = buildNewObj(object1, object2);

  return selectFormat(tree, format);
}

export default gendiff;