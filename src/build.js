import _ from 'lodash';

const createNode = (type, key, previousValue, newValue) => {
  const node = {
    type,
    key,
    previousValue,
    newValue,
  };

  return node;
};

const createNodeType = (state1, state2, value1, value2) => {
  let type;

  const areValuesEqual = value1 === value2;

  switch (true) {
    case (!state1 && state2):
      type = 'added';
      break;
    case (state1 && !state2):
      type = 'deleted';
      break;
    default:
      type = areValuesEqual ? 'unchanged' : 'changed';
      break;
  }

  return type;
};

const createList = (key, node) => {
  const list = {
    key,
    children: node,
  };

  return list;
};

const isNodeAList = (node) => Array.isArray(node);

const buildAST = (data1, data2) => {
  const clonedData1 = _.cloneDeep(data1);
  const clonedData2 = _.cloneDeep(data2);

  const mergedData = _.merge(clonedData1, clonedData2);

  const iter = (data, path) => {
    const isDataAPrimitive = !_.isObject(data);

    if (isDataAPrimitive) {
      const doesData1IncludeKey = _.has(data1, path);
      const doesData2IncludeKey = _.has(data2, path);

      const key = path.at(-1);

      const previousValue = _.get(data1, path);
      const newValue = _.get(data2, path);

      const type = createNodeType(
        doesData1IncludeKey,
        doesData2IncludeKey,
        previousValue,
        newValue,
      );
      const node = createNode(type, key, previousValue, newValue);

      return node;
    }

    const entries = Object.entries(data);

    const tree = entries.map(([key, value]) => {
      const currentPath = [...path, `${key}`];

      const doesData1IncludeKey = _.has(data1, currentPath);
      const doesData2IncludeKey = _.has(data2, currentPath);

      const previousValue = _.get(data1, currentPath);
      const newValue = _.get(data2, currentPath);

      const isCurrentValueAnObject = _.isObject(value);
      const isPreviousValueAnObject = _.isObject(previousValue);
      const isNewValueAnObject = _.isObject(newValue);

      if (!isCurrentValueAnObject || (isPreviousValueAnObject && isNewValueAnObject)) {
        const node = iter(value, currentPath);
        const list = createList(key, node);

        const isCurrentNodeAList = isNodeAList(node);

        return isCurrentNodeAList ? list : node;
      }

      const type = createNodeType(
        doesData1IncludeKey,
        doesData2IncludeKey,
        previousValue,
        newValue,
      );
      const node = createNode(type, key, previousValue, newValue);

      return node;
    });

    return tree;
  };

  // console.log(`mergedData:\n ${JSON.stringify(mergedData, null, 2)}`);
  // console.log(JSON.stringify(iter(mergedData, []), null, 2));

  return iter(mergedData, []);
};

export default buildAST;
