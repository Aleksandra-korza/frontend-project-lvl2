import yaml from 'js-yaml';
import * as path from 'path';

const selectFileExtension = (filepath, file) => {
  if (path.extname(filepath) === '.json') {
    const obj = JSON.parse(file); // расп. файлы JSON.parse(file1):изJSON строки->в вид обj
    return obj;
  }

  if (path.extname(filepath) === '.yml' || path.extname(filepath) === '.yaml') {
    const obj = yaml.load(file); // расп.файлы yaml.load(file):из yamlстроки->в видобj
    return obj;
  }
  return `Unknown file extension : '${filepath}'.`;
};

export default selectFileExtension;
