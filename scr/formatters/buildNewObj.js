import lodash from 'lodash';

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

  export default buildNewObj;