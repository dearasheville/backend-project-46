#!/usr/bin/env node

import fs from 'fs';
import path from 'path';

import { program } from 'commander';
import _ from 'lodash';

const genDiff = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  const uniqueKeys = _.sortBy(_.uniq([...keys1, ...keys2]));

  const string = uniqueKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

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

program
  .argument('<filepath1>', '')
  .argument('<filepath2>', '')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const ablsolutePath1 = path.resolve(filepath1);
    const ablsolutePath2 = path.resolve(filepath2);

    const data1 = JSON.parse(fs.readFileSync(ablsolutePath1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(ablsolutePath2, 'utf-8'));

    console.log(genDiff(data1, data2));
  })
  .parse();

export default genDiff;
