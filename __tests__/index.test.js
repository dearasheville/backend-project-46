import fs from 'fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('comparison of flat json files', () => {
  const filename1 = 'file1.json';
  const filename2 = 'file2.json';
  const filename3 = 'expected.txt';

  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);

  const testData = gendiff(filepath1, filepath2);
  const expectedData = readFile(filename3);

  expect(testData).toEqual(expectedData);
});

test('comparison of flat yaml files', () => {
  const filename1 = 'file1.yml';
  const filename2 = 'file2.yml';
  const filename3 = 'expected.txt';

  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);

  const testData = gendiff(filepath1, filepath2);
  const expectedData = readFile(filename3);

  expect(testData).toEqual(expectedData);
});
