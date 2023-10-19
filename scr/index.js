// import path from 'path';
import selectFormat from './formatters/index.js';
import takeData from './formatters/parses.js';
import buildNewObj from './formatters/buildNewObj.js';

function gendiff(file1, file2, format) {
  // if ((path.extname(file1) === '.json' || path.extname(file1) === '.yml' || path.extname(file1) === '.yaml')
  // && (path.extname(file2) === '.json' || path.extname(file2) === '.yml' || path.extname(file2) === '.yaml')) {
    const object1 = takeData(file1);
    const object2 = takeData(file2);

    const tree = buildNewObj(object1, object2);

    return selectFormat(tree, format);
  }

//   return 'The program does not work with this format';
// }

export default gendiff;
