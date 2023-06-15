import fs from 'fs';
import path from 'path';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import gendiff from '../src/gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('gendiff', () => {
  const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
  const filepath2 = path.join(__dirname, '../__fixtures__/file2.json');

  const filepath3 = path.join(__dirname, '../__fixtures__/result.txt');

  const difference = gendiff(filepath1, filepath2);
  const result = fs.readFileSync(filepath3, 'utf-8');

  console.log(result);

  expect(difference).toEqual(result);
});
