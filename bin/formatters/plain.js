import lodash from 'lodash';

const stringify = (value) => {
  if (lodash.isObject(value)) {
    return '[complex value]';
  }
  return lodash.isString(value) ? `'${value}'` : value;
};

const plain = (newObj1) => {
  const styl = (obj, paths) => obj.flatMap((miniObj) => {
    const path = [...paths, miniObj.key].join('.');

    if (miniObj.type === 'added') {
      return (`Property '${path}' was added with value: ${stringify(miniObj.value)}`);
    }
    if (miniObj.type === 'removed') {
      return (`Property '${path}' was removed`);
    }
    if (miniObj.type === 'unchanged') {
      return [];
    }
    if (miniObj.type === 'changed') {
      return (`Property '${path}' was updated. From ${stringify(miniObj.value1)} to ${stringify(miniObj.value2)}`);
    }
    if (miniObj.type === 'nested') {
      return `${styl(miniObj.value, [path]).join('\n')}`;
    }

    return `Type: ${miniObj.type} is undefined`;
  });

  const stylishDiff = styl(newObj1, []);

  return [...stylishDiff].join('\n');
};

export default plain;
