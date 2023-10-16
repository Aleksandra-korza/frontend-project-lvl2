import lodash from 'lodash';
import fs from 'fs';
import * as path from 'path';
import selectFormat from './bin/formatters/index.js';
import yaml from 'js-yaml';

const takeData = (filepath) => {

  if (path.extname(filepath) === '.json') {
  const path1 = path.resolve(process.cwd(), '_fixtures_', filepath); // конструируем полный путь process.cwd()

  const file = fs.readFileSync(path1, 'utf-8'); // fs - модуль для работы с файловой системой на JS,

  const obj = JSON.parse(file); // расп. файлы JSON.parse(file1):изJSON строки->в вид обj

  return obj;
  }

  if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml') {
    const path1 = path.resolve(process.cwd(), '_fixtures_', filepath); // конструируем полный путь process.cwd()
  
    const file = fs.readFileSync(path1, 'utf-8'); // fs - модуль для работы с файловой системой на JS,
  
    const obj = yaml.load(file); // расп. файлы JSON.parse(file1):изJSON строки->в вид обj
  
    return obj;
    }

};

function gendiff(obj11, obj22, format) {

  const obj111 = takeData(obj11);
  const obj222 = takeData(obj22);

  const buildNewObj = (obj1, obj2) => {
    const keys = lodash.sortBy(lodash.union(lodash.keys(obj1), lodash.keys(obj2)));

    return keys.map((key) => {
      if (!lodash.has(obj1, key)) {
        return { key, type: 'added', value: obj2[key] };
      }
      if (!lodash.has(obj2, key)) {
        return { key, type: 'removed', value: obj1[key] };
      }
      if (lodash.isObject(obj1[key]) && lodash.isObject(obj2[key])) {
        return { key, type: 'nested', value: buildNewObj(obj1[key], obj2[key]) };
      }
      if (!lodash.isEqual(obj1[key], obj2[key])) {
        return {
          key, type: 'changed', value1: obj1[key], value2: obj2[key],
        };
      }

      return { key, type: 'unchanged', value: obj1[key] };
    });
  };

  const tree = buildNewObj(obj111, obj222);

  return selectFormat(tree, format);
}

export default gendiff;
