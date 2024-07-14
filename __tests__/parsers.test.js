import path from 'path';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import parseFile from '../src/parsers.js';

import { getFileExtension } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('json parser', () => {
  const filename = 'file1.json';

  const filepath = getFixturePath(filename);

  const extension = getFileExtension(filepath);

  const testData = parseFile(filepath, extension);
  const expectedData = {
    host: 'hexlet.io',
    timeout: 50,
    proxy: '123.234.53.22',
    follow: false,
  };

  expect(testData).toEqual(expectedData);
});

test('yml parser', () => {
  const filename = 'file2.yml';

  const filepath = getFixturePath(filename);

  const extension = getFileExtension(filepath);

  const testData = parseFile(filepath, extension);
  const expectedData = {
    timeout: 20,
    verbose: true,
    host: 'hexlet.io',
  };

  expect(testData).toEqual(expectedData);
});
