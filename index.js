import lodash from 'lodash';
import fs from 'fs';
import * as path from 'path';
 
const takeData = (filepath) => {

  const path1 = path.resolve(process.cwd(), '_fixtures_', filepath); // конструируем полный путь process.cwd()

const file = fs.readFileSync(path1, 'utf-8'); // fs - модуль для работы с файловой системой на JS,

const obj = JSON.parse(file); // расп. файлы JSON.parse(file1):изJSON строки->в вид обj

return obj;

}





function gendiff(obj11, obj22) {

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

  const stringify = (carentValue, deph, replacer = ' ') => {
    if (!lodash.isObject(carentValue)) {
      return `${carentValue}`;
    }

    const currentIndent = replacer.repeat(deph + 1);
    const indentForSign = currentIndent.slice(2);

    const str = Object.entries(carentValue).map(([key, val]) => `${currentIndent}${key}: ${stringify(val, deph + 1, replacer)}`);

    return ['{', ...str, `${indentForSign}}`].join('\n');
  };

  const signs = {
    added: '+', removed: '-', unchanged: ' ',
  };

  const stylish = (newObj1, replacer = '    ') => {
    function styl(obj, depth) {
      const styleLine = obj.map((miniObj) => {
        const indent = replacer.repeat(depth);

        const indentForSign = indent.slice(2);

        function makeLine(value, sign) {
          return (`${indentForSign}${sign} ${miniObj.key}: ${stringify(value, depth, replacer)}`);
        }

        if (miniObj.type === 'added') {
          return makeLine(miniObj.value, signs.added);
        }
        if (miniObj.type === 'removed') {
          return makeLine(miniObj.value, signs.removed);
        }
        if (miniObj.type === 'unchanged') {
          return makeLine(miniObj.value, signs.unchanged);
        }
        if (miniObj.type === 'changed') {
          return [`${makeLine(miniObj.value1, signs.removed)}`,
            `${makeLine(miniObj.value2, signs.added)}`].join('\n');
        }
        if (miniObj.type === 'nested') {
          return `${indent}${miniObj.key}: ${['{', ...styl(miniObj.value, depth + 1), `${indent}}`].join('\n')}`;
        }
        return `Type: ${miniObj.type} is undefined`;
      });
      return styleLine;
    }
    const stylishDiff = styl(newObj1, 1);

    return (['{', ...stylishDiff, '}'].join('\n'));

  };

  return stylish(buildNewObj(obj111, obj222));
}

export default gendiff;