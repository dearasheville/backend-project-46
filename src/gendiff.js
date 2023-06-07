#!/usr/bin/env node
/* eslint-disable no-restricted-syntax */

import { program } from 'commander';
import fs from 'fs';

const genDiff = (firstData, secondData) => {
  const firstDataEntries = Object.entries(firstData);
  const secondDataEntries = Object.entries(secondData);

  const firstObject = {};
  const secondObject = {};

  for (const [key, value] of secondDataEntries) {
    if (firstData.hasOwnProperty(key)) {
      if (firstData[key] === value) {
        firstObject[`  ${key}`] = value;
      } else if (firstData[key] !== value) {
        firstObject[`- ${key}`] = firstData[key];
        firstObject[`+ ${key}`] = value;
      }
    } else {
      firstObject[`+ ${key}`] = value;
    }
  }

  for (const [key, value] of firstDataEntries) {
    if (secondData.hasOwnProperty(key)) {
      if (secondData[key] === value) {
        secondObject[`  ${key}`] = value;
      } else if (secondData[key] !== value) {
        secondObject[`+ ${key}`] = secondData[key];
        secondObject[`- ${key}`] = value;
      }
    } else {
      secondObject[`- ${key}`] = value;
    }
  }

  return JSON.stringify({ ...firstObject, ...secondObject });
};

program
  .argument('<filepath1>', '')
  .argument('<filepath2>', '')
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => {
    const data1 = JSON.parse(fs.readFileSync(filepath1, 'utf-8'));
    const data2 = JSON.parse(fs.readFileSync(filepath2, 'utf-8'));

    console.log(genDiff(data1, data2));
  })
  .parse();

export default genDiff;
