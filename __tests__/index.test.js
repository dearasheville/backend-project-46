import fs from 'fs';
import path from 'path';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('json and yml gendiff', () => {
  const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
  const filepath2 = path.join(__dirname, '../__fixtures__/file2.yml');
  const filepath3 = path.join(__dirname, '../__fixtures__/result.txt');

  const difference = gendiff(filepath1, filepath2);
  const result = fs.readFileSync(filepath3, 'utf-8');

  expect(difference).toEqual(result);
});

test('yml and json gendiff', () => {
  const filepath1 = path.join(__dirname, '../__fixtures__/file1.yml');
  const filepath2 = path.join(__dirname, '../__fixtures__/file2.json');
  const filepath3 = path.join(__dirname, '../__fixtures__/result.txt');

  const difference = gendiff(filepath1, filepath2);
  const result = fs.readFileSync(filepath3, 'utf-8');

  expect(difference).toEqual(result);
});
