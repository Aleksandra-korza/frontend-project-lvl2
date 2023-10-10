import lodash from 'lodash';

const stringify = (value) => {
  if (!lodash.isObject(value)) {
    return '[complex value]';
  }

  return lodash.isString(value) ? `${value}` : value;

};

const plain = (newObj1) => {
  function styl(obj) {
    const plain = obj.map((miniObj) => {

      // const getRate = (from, to) => {
      //   if (!_.has(rates, [from, to])) {
      //     throw new Error(`Unknown rate: from '${from}', to '${to}'.`);
      //   }
      //   return rates[from][to];
      // }

      function makeLine(value) {
        //console.log(`Property ${miniObj.key}.`);
        return (`Property ${miniObj.key} `);
      }

    

      if (miniObj.type === 'added') {
        console.log(`${makeLine(miniObj)}was added with value:${stringify(miniObj.value)}`);
        //return (`${miniObj.key}${makeLine(miniObj)}was added with value:${stringify(miniObj.value)}`); // Property 'common.follow' was added with value: false  // Property 'group3' was added with value: [complex value]
      }
      if (miniObj.type === 'removed') { // Property 'common.setting2' was removed
        return (`${makeLine(miniObj.value)}was removed`);
      }
      if (miniObj.type === 'unchanged') { // Property 'common.follow' was added with value: false
        return (`${makeLine(miniObj.value)}was added with value:${key.value}`);
      }
      if (miniObj.type === 'changed') { // Property 'common.setting3' was updated. From true to null
        return `${makeLine(miniObj.value1)} was updated. From ${miniObj.value1} to ${miniObj.value2}`;
      }
      if (miniObj.type === 'nested') {
        return (`${makeLine(miniObj.key)} was added with value: ${(miniObj.value)}`);
      }
      return `Type: ${miniObj.type} is undefined`;
    });
    
  }
  const stylishDiff = styl(newObj1, 1);

  return ([ ...stylishDiff].join('\n'));
};

//plain(buildNewObj(obj11, obj22));

export default plain;

// Property 'common.follow' was added with value: false
// Property 'common.setting2' was removed
// Property 'common.setting3' was updated. From true to null
// Property 'common.setting4' was added with value: 'blah blah'
// Property 'common.setting5' was added with value: [complex value]
// Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
// Property 'common.setting6.ops' was added with value: 'vops'
// Property 'group1.baz' was updated. From 'bas' to 'bars'
// Property 'group1.nest' was updated. From [complex value] to 'str'
// Property 'group2' was removed
// Property 'group3' was added with value: [complex value]