import fs from 'fs';
import path from 'path';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import parser from '../src/parsers.js';

import { getFileExtension } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test('parser', () => {
  const filepath1 = path.join(__dirname, '../__fixtures__/file1.json');
  const filepath2 = path.join(__dirname, '../__fixtures__/file1.yml');

  const [extension1, extension2] = [filepath1, filepath2].map(getFileExtension);

  const [data1, data2] = [parser(filepath1, extension1), parser(filepath2, extension2)];

  const result1 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  const result2 = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  expect(data1).toEqual(result1);
  expect(data2).toEqual(result2);
});
