import lodash from 'lodash';
import buildNewObj from '../index.js';

const stringify = (carentValue, deph, replacer) => {
    if (!lodash.isObject(carentValue)) {
      return `[complex value]`;
    }


    const str = Object.entries(carentValue).map(([key, val]) => `${currentIndent} ${key}: ${stringify(val, deph + 1, replacer)}`);

    return ['{', ...str, `${indentForSign}}`].join('\n');
  };

 
  const plain = (newObj1, replacer = '    ') => {
    function styl(obj, depth) {
      const plain = obj.map((miniObj) => {
        const indent = replacer.repeat(depth);

        const indentForSign = indent.slice(2);

        function makeLine(value) {
          return (`Property ${miniObj.key}.${value}`);
        }

        if (miniObj.type === 'added') {
          return (`${makeLine(miniObj.value)}was added with value:${key.value}`);  // Property 'common.follow' was added with value: false  // Property 'group3' was added with value: [complex value]
        }
        if (miniObj.type === 'removed') {  //Property 'common.setting2' was removed  
          return (`${makeLine(miniObj.value)}was removed`);
        }
        if (miniObj.type === 'unchanged') { // Property 'common.follow' was added with value: false 
          return (`${makeLine(miniObj.value)}was added with value:${key.value}`); 
        }
        if (miniObj.type === 'changed') {  // Property 'common.setting3' was updated. From true to null
          return `${makeLine(miniObj.value1)} was updated. From ${miniObj.value1} to ${miniObj.value2}`.join('\n');
        
        }
        if (miniObj.type === 'nested') {
          return (`${makeLine(miniObj.key)} was added with value: ${stringify((miniObj.value), depth + 1)}`).join('\n');
        }
        return `Type: ${miniObj.type} is undefined`;
      });
      return styleLine;
    }
    const stylishDiff = styl(newObj1, 1);

    return (['{', ...stylishDiff, '}'].join('\n'));

  };

  return plain(buildNewObj(obj11, obj22)); 
  
export default plain;