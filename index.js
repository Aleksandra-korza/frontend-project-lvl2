import lodash from 'lodash';

const gendiff = (obj1, obj2) => {
    const keys = lodash.sortBy(lodash.union(lodash.keys(obj1), lodash.keys(obj2))); // набор уникальных ключей двух файлов
    const keyFiltr = keys.map((key) => { // John // перебираем уникальные ключи по очереди
        if (!lodash.has(obj1, key)) {  // если в первом файле нет ключа, то
            return {  // возвращаем ключ для второго файла и типируем как 'added' 
                type: '+',
                key: key,
                value: obj2[key]
            } // если 
        }
        if (!lodash.has(obj2, key)) {  //  если во втором файле нет ключа , то 
            return {  // записываем ключь первого файла и типируем как 'removed'
                type: '-',
                key: key,
                value: obj1[key]
            }
        }
        if ((lodash.has(obj1, key)) || (lodash.has(obj2, key))) { // если  ключи совпадают
            if (obj1[key] !== obj2[key]) {
                return [ // возвращаем ключ первого файла и второго файла
                    {
                        type: '-',
                        key: key,
                        value: obj1[key]
                    },
                    {
                        type: '+',
                        key: key,
                        value: obj2[key]
                    }
                ]
            }

            return {  // возвращаем ключ первого файла
                type: ' ',
                key: key,
                value: obj1[key]
            }

        }

    })
   
    const step3filtr = keyFiltr.map((arr) => {

if (Array.isArray(arr)) {
     return arr.map((ar) => {
         
         return Object.values(`${ar.type} ${ar.key}: ${ar.value}`).join('');
    })
}
        return Object.values(`${arr.type} ${arr.key}: ${arr.value}`).join('');
   
    }
               
);

    return JSON.stringify(step3filtr.flat(), null, '\t');
};



export default gendiff;