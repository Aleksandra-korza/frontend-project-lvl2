import lodash from 'lodash';
import _ from 'lodash';


function gendiff(obj1, obj2) {


    const keys = lodash.sortBy(lodash.union(lodash.keys(obj1), lodash.keys(obj2))); // набор уникальных ключей двух файлов
    
    const tree = {};

    const keyFiltr = keys.flatMap((key) => {

        if (!lodash.has(obj1, key)) { // если в первом файле нет ключа, то
            if (_.isObject(obj1[key])) {
               return gendiff(obj1[key]);
            }
            return {
                type: 'added',
                //sign: '+',
                key: key,
                value: obj2[key]
            };
        }
        if (!lodash.has(obj2, key)) {  //  если во втором файле нет ключа , то 
            return {
                type: 'removed',
                //sign: '-',
                key: key,
                value: obj1[key],
            }
        }
        if ((lodash.has(obj1, key)) || (lodash.has(obj2, key))) { // если  ключи совпадают
            if ((obj1[key] !== obj2[key]) && (!_.isObject(obj2[key]))) {
                return [
                    {
                        type: 'changed',
                        key: key,
                        //sign: '-',
                        value: obj1[key],

                        //sign: '+',
                        value2: obj2[key],
                        //children: []
                    }
                ];
            }
            else if ((obj1[key] !== obj2[key]) && (_.isObject(obj1[key]) || (_.isObject(obj2[key])))) {
                 return gendiff(obj1[key], obj2[key]);
                 //{
                //     key: key,
                //     type: 'changed',
                //     value: gendiff(obj1[key], obj2[key])
                // };
            }
            return {
                type: 'unchanged',
                //sign: ' ',
                key: key,
                value: obj1[key]
            };
        }
    });


    const stringify = (value, replacer = ' ', spacesCount = 1) => {

        const iter = (carentValue, deph) => {

            if (typeof carentValue !== 'object' || carentValue === null) {

                return String(carentValue);

            }

            const indenSize = spacesCount * deph;
            const currentIndent = replacer.repeat(indenSize);
            const bracetIndent = replacer.repeat(indenSize - spacesCount);

            const array = Object.entries(carentValue);

            const str = array.map(([key, val]) => `${currentIndent}${key}: ${iter(val, deph + 4)}`);

            const result = ['{', ...str, `${bracetIndent}}`].join('\n');

            return result;

        };

        return iter(value, 1);
    };


    return keyFiltr.flat();


    //return stringify(keyFiltr.flat());

};

export default gendiff;