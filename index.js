import lodash from 'lodash';

const gendiff = (obj1, obj2) => {
    const keys = lodash.sortBy(lodash.union(lodash.keys(obj1), lodash.keys(obj2))); // набор уникальных ключей двух файлов
    return keys.map((key) => {  // перебираем уникальные ключи по очереди
        if (!lodash.has(obj1, key)) {  // если в первом файле нет ключа, то
            return {  // возвращаем ключ для второго файла и типируем как 'added' 
                key: key,
                type: 'added',
                value: obj2[key]
            } // если 
        }
        if (!lodash.has(obj2, key)) {  //  если во втором файле нет ключа , то 
            return {  // записываем ключь первого файла и типируем как 'removed'
                key: key,
                type: 'removed',
                value: obj1[key]
            }
        }
        if ((lodash.has(obj1, key)) || (lodash.has(obj2, key))) { // если  ключи совпадают
            if (obj1[key] !== obj2[key]) {
                return [  // возвращаем ключ первого файла и второго файла
                    {
                        key: key,
                        type: 'changed',
                        value: obj1[key]
                    },
                    {
                        key: key,
                        type: 'changed',
                        value: obj2[key]
                    }
                ]
            }

            return {  // возвращаем ключ первого файла
                key: key,
                type: 'unchanged',
                value: obj1[key]
            }

        }

    });
}


export default gendiff;