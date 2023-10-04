const stringify = (carentValue, deph, replacer = ' ') => {
    if (!lodash.isObject(carentValue)) {
      return `[complex value]`;
    }

    

    const str = Object.entries(carentValue).map(([key, val]) => `${currentIndent} ${key}: ${stringify(val, deph + 1, replacer)}`);

    return ['{', ...str, `${indentForSign}}`].join('\n');
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
          return makeLine(miniObj.value, signs.added);  // Property 'common.follow' was added with value: false  // Property 'group3' was added with value: [complex value]
        }
        if (miniObj.type === 'removed') {  //Property 'common.setting2' was removed  
          return makeLine(miniObj.value, signs.removed);
        }
        if (miniObj.type === 'unchanged') {
          return makeLine(miniObj.value, signs.unchanged);
        }
        if (miniObj.type === 'changed') { // Property 'group1.nest' was updated. From [complex value] to 'str'
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
