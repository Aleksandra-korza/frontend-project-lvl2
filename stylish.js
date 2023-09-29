import lodash from 'lodash';
import _ from 'lodash';

const stylish = (obj) => {
  const changeOwner = (tree, owner) => {
    const name = getName(tree);
    const newMeta = _.cloneDeep(getMeta(tree));
    newMeta.owner = owner;

    if (isFile(tree)) {
      // Возвращаем обновлённый файл
      return mkfile(name, newMeta);
    }
    // Дальше идет работа, если директория

    const children = getChildren(tree);
    // Ключевая строчка
    // Вызываем рекурсивное обновление каждого ребёнка
    const newChildren = children.map((child) => changeOwner(child, owner));
    const newTree = mkdir(name, newChildren, newMeta);

    // Возвращаем обновлённую директорию
    return newTree;
  };

  // Эту функцию можно обобщить до map (отображения), работающего с деревьями
};

export default stylish;
