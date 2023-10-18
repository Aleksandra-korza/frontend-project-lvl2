import fs from 'fs';
import * as path from 'path';
import selectFileExtension from './selectFileExtension.js';

const takeData = (filepath) => {
    const fullPath = path.resolve(process.cwd(), '__fixtures__', filepath); // конструируем полный путь process.cwd()
    const file = fs.readFileSync(fullPath, 'utf-8'); // fs - модуль для работы с файловой системой на JS,
    return selectFileExtension(filepath, file);
   
  };

  export default takeData;