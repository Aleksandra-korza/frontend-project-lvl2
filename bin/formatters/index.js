import stylish from './stylish.js';
import plain from './plain.js';

const selectАormat = (diffArr, style) => {
    
    if (style === 'plain') {
      return plain(diffArr);
    }
    return stylish(diffArr);
  };
  
  export default selectАormat;