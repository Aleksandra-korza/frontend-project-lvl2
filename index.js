import lodash from 'lodash';

function gendiff(obj1, obj2) {
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

    const str = Object.entries(carentValue).map(([key, val]) => `${currentIndent} ${key}: ${stringify(val, deph + 1, replacer)}`);

    // console.log(currentIndent);

    return ['{', ...str, `${indentForSign}}`].join('\n');
  };

  const signs = {
    added: '+', removed: '-', unchanged: ' ',
  };

  const stylish = (newObj1, replacer = '    ') => {
    function styl(obj, depth) {
      const styleLine = obj.map((miniObj) => {
        const indent = replacer.repeat(depth);
        // console.log(indent);
        const indentForSign = indent.slice(2);
        // console.log(indentForSign);

        function makeLine(value, sign) {
          // console.log(value, mark);
          return (`${indentForSign}${sign} ${miniObj.key}: ${stringify(value, depth, replacer)}`);
        }

        if (miniObj.type === 'added') {
          // console.log(makeLine(miniObj.value, sign.added));
          return makeLine(miniObj.value, signs.added);
        }
        if (miniObj.type === 'removed') {
          // console.log(makeLine(miniObj.value, sign.removed));
          return makeLine(miniObj.value, signs.removed);
        }
        if (miniObj.type === 'unchanged') {
          // console.log(makeLine(miniObj.value, sign.unchanged));
          return makeLine(miniObj.value, signs.unchanged);
        }
        if (miniObj.type === 'changed') {
          // console.log([`${makeLine(miniObj.value1, sign.deleted)}`,
          // `${makeLine(miniObj.value2, sign.added)}`].join('\n'));
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

  return stylish(buildNewObj(obj1, obj2));
  // return stylish(obj1, obj2);

  // return gendiff(obj1, obj2);

  // return stringify(keyFiltr(obj1, obj2));

  // return stringify(stylish(keyFiltr(obj1, obj2)));
}

export default gendiff;
