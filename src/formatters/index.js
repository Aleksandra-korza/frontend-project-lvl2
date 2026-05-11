import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

const selectFormat = (diffArr, style) => {
  switch (style) {
    case 'plain':
      return plain(diffArr)

    case 'json':
      return json(diffArr)

    default:
      console.error(`Unknown format: ${style}`)
      return stylish(diffArr)
  }
}

export default selectFormat
