import yaml from 'js-yaml'
import path from 'path'

const selectFileExtension = (filepath, file) => {
  switch (path.extname(filepath)) {
    case '.json':
      return JSON.parse(file) // расп. файлы JSON.parse(file1):изJSON строки->в вид обj

    case '.yml':
    case '.yaml':
      return yaml.load(file) // расп.файлы yaml.load(file):из yamlстроки->в видобj

    default:
      console.error('Unknown file extension.')
      return 'Unknown file extension.'
  }
}

export default selectFileExtension
