/* eslint-disable max-len */

import _ from 'lodash';

import parser from './parsers.js';

import { getAblsolutePath, getFileExtension } from './utils.js';

const genDiff = (filepath1, filepath2) => {
  const [absolutePath1, absolutePath2] = [filepath1, filepath2].map(getAblsolutePath);
  const [extension1, extension2] = [absolutePath1, absolutePath2].map(getFileExtension);

  const [data1, data2] = [parser(absolutePath1, extension1), parser(absolutePath2, extension2)];

  const [keys1, keys2] = [Object.keys(data1), Object.keys(data2)];
  const uniqueKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const string = uniqueKeys.reduce((acc, key) => {
    const [value1, value2] = [data1[key], data2[key]];

    if (!_.has(data1, key) && _.has(data2, key)) {
      return `${acc}\n  + ${key}: ${value2}`;
    }

    if (_.has(data1, key) && !_.has(data2, key)) {
      return `${acc}\n  - ${key}: ${value1}`;
    }

    if (_.has(data1, key) && _.has(data2, key)) {
      if (value1 === value2) {
        return `${acc}\n    ${key}: ${value1}`;
      }
    }

    return `${acc}\n  - ${key}: ${value1}\n  + ${key}: ${value2}`;
  }, '');

  return `{${string}\n}`;
};

export default genDiff;
