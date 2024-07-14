import _ from 'lodash';

import parseFile from './parsers.js';

import {
  getAblsolutePath,
  getFileExtension,
} from './utils.js';

const genDiff = (filepath1, filepath2) => {
  const absoluteFilepath1 = getAblsolutePath(filepath1);
  const absoluteFilepath2 = getAblsolutePath(filepath2);

  const fileExtension1 = getFileExtension(filepath1);
  const fileExtension2 = getFileExtension(filepath2);

  const data1 = parseFile(absoluteFilepath1, fileExtension1);
  const data2 = parseFile(absoluteFilepath2, fileExtension2);

  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqueKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const string = uniqueKeys.reduce((acc, key) => {
    const doesData1IncludeKey = _.has(data1, key);
    const doesData2IncludeKey = _.has(data2, key);

    const value1 = data1[key];
    const value2 = data2[key];

    if (doesData1IncludeKey && !doesData2IncludeKey) {
      return `${acc}\n  - ${key}: ${value1}`;
    }

    if (!doesData1IncludeKey && doesData2IncludeKey) {
      return `${acc}\n  + ${key}: ${value2}`;
    }

    if (doesData1IncludeKey && doesData2IncludeKey) {
      if (value1 === value2) {
        return `${acc}\n    ${key}: ${value1}`;
      }
    }

    return `${acc}\n  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  }, '');

  return `{${string}\n}`;
};

export default genDiff;
