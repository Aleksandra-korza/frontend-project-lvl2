import lodash from 'lodash'

const stringify = (carentValue, deph, replacer = ' ') => {
  if (!lodash.isObject(carentValue)) {
    return `${carentValue}`
  }

  const currentIndent = replacer.repeat(deph + 1)
  const indentForSign = currentIndent.slice(4)

  const str = Object.entries(carentValue).map(([key, val]) => `${currentIndent}${key}: ${stringify(val, deph + 1, replacer)}`)

  return ['{', ...str, `${indentForSign}}`].join('\n')
}

const signs = {
  added: '+', removed: '-', unchanged: ' ',
}

const stylish = (newObj1, replacer = '    ') => {
  function styl(obj, depth) {
    const styleLine = obj.map((miniObj) => {
      const indent = replacer.repeat(depth)

      const indentForSign = indent.slice(2)

      function makeLine(value, sign) {
        return (`${indentForSign}${sign} ${miniObj.key}: ${stringify(value, depth, replacer)}`)
      }

      switch (miniObj.type) {
        case 'added':
          return makeLine(miniObj.value, signs.added)

        case 'removed':
          return makeLine(miniObj.value, signs.removed)

        case 'unchanged':
          return makeLine(miniObj.value, signs.unchanged)

        case 'changed':
          return [`${makeLine(miniObj.value1, signs.removed)}`,
            `${makeLine(miniObj.value2, signs.added)}`].join('\n')

        case 'nested':
          return `${indent}${miniObj.key}: ${['{', ...styl(miniObj.value, depth + 1), `${indent}}`].join('\n')}`

        default:
          return `Type: ${miniObj.type} is undefined`
      }
    })
    return styleLine
  }
  const stylishDiff = styl(newObj1, 1)

  return (['{', ...stylishDiff, '}'].join('\n'))
}

export default stylish
