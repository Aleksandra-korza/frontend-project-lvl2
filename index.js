import lodash from 'lodash';

const gendiff = (obj1, obj2) => {
    const keys = lodash.sortBy(lodash.union(lodash.keys(obj1), lodash.keys(obj2))); // набор уникальных ключей двух файлов
    const keyFiltr = keys.map((key) => { // John // перебираем уникальные ключи по очереди
        if (!lodash.has(obj1, key)) {  // если в первом файле нет ключа, то
            return {  // возвращаем ключ для второго файла и типируем как 'added'
                type: 'added',
                sign: '+',
                key: key,
                value: obj2[key]
                // `+ ${key}: ${obj2[key]}`; 


            } // если 
        }
        if (!lodash.has(obj2, key)) {  //  если во втором файле нет ключа , то 
            return {  // записываем ключь первого файла и типируем как 'removed'
                type: 'removed',
                sign: '-',
                key: key,
                value: obj1[key]
               // `- ${key}: ${obj1[key]}`; 
            }
        }
        if ((lodash.has(obj1, key)) || (lodash.has(obj2, key))) { // если  ключи совпадают
            if (obj1[key] !== obj2[key]) {
                return [ // возвращаем ключ первого файла и второго файла // changed
                    {
                        type: 'changed', // '-'
                        sign: '-',
                        key: key,
                        value: obj1[key]
                        // `- ${key}: ${obj1[key]}`; 
                    },
                    {
                        type: 'changed', // '+'
                        sign: '+',
                        key: key,
                        value: obj2[key]

                        // `+ ${key}: ${obj2[key]}`; // вот так записать и проверить какой будет вывод????
                    }
                ]
            }

            return {  // возвращаем ключ первого файла //unchanged
                type: 'unchanged', // ' '
                sign: ' ',
                key: key,
                value: obj1[key]

                // ` ${key}: ${obj1[key]}`; //может вместо формирования объекта, так записать???? 
            }  

        }

    })

    // const structuredResult = (obj) => {

    //     const signs = {
    //         added: '+',
    //         removed: '-',
    //         changed1: '-',
    //         changed2: '+',
    //         unchanged: ' ',
    //       };

    //      return `{sign} ` 
    // }

    
    
   
    const stringify = (value, replacer = ' ', spacesCount = 1) => {
  
        const iter = (carentValue, deph) => {
        
          if (typeof carentValue !== 'object' || carentValue === null) {
        
            return String(carentValue); 
        
             //boolean
            
          }
        
          const indenSize = spacesCount * deph;
          const currentIndent = replacer.repeat(indenSize);
          const bracetIndent = replacer.repeat(indenSize - spacesCount);
        
          const array = Object.entries(carentValue); 
          
          //[['string', 'value'],
            //['boolean', true],
            //['number', 5],]
        
          const str = array.map(([key, val]) => `${currentIndent}${key}: ${iter(val, deph + 1)}`);
        
          // [
          //   '  5: number',
          //   '  1.25: float',
          //   '  null: null',
          //   '  true: boolean',
          //   '  value: string',
          //   '  nested: {\n' +
          //   '   boolean: true\n' +
          //   '   float: 1.25\n' +
          //   '   string: value\n' +
          //   '   number: 5\n' +
          //   '   null: null\n' +
          //   '  }'
          // ]
        
        
          const result = ['{', ...str, `${bracetIndent}}`].join('\n');
          return result;
        
          // {
          //   5: number
          //   1.25: float
          //   null: null
          //   true: boolean
          //   value: string
          //   nested: {
          //     boolean: true
          //     float: 1.25
          //     string: value
          //     number: 5
          //     null: null
          //   }
          // }
        
          
        };
        
          return iter(value, 1);
        }; //нет запуска стрингифай пока
        

    
return stringify(keyFiltr.flat());
 
};




export default gendiff;