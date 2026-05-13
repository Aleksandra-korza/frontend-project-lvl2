import lodash from 'lodash'

const stringify = (value) => {
  if (lodash.isObject(value)) {
    return '[complex value]'
  }
  return lodash.isString(value) ? `'${value}'` : value
}

const plain = (newObj1) => {
  const styl = (obj, paths) => obj.flatMap((miniObj) => {
    const path = [...paths, miniObj.key].join('.')

    switch (miniObj.type) {
      case 'added':
        return (`Property '${path}' was added with value: ${stringify(miniObj.value)}`)

      case 'removed':
        return (`Property '${path}' was removed`)

      case 'unchanged':
        return []

      case 'changed':
        return (`Property '${path}' was updated. From ${stringify(miniObj.value1)} to ${stringify(miniObj.value2)}`)

      case 'nested':
        return `${styl(miniObj.value, [path]).join('\n')}`

      default:
        return `Type: ${miniObj.type} is undefined`
    }
  })

  const stylishDiff = styl(newObj1, [])

  return [...stylishDiff].join('\n')
}

export default plain
