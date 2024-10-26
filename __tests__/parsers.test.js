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

  const receivedData = parseFile(filepath, extension);
  const expectedData = {
    common: {
      setting1: 'Value 1',
      setting2: 200,
      setting3: true,
      setting6: {
        key: 'value',
        doge: {
          wow: '',
        },
      },
    },
    group1: {
      baz: 'bas',
      foo: 'bar',
      nest: {
        key: 'value',
      },
    },
    group2: {
      abc: 12345,
      deep: {
        id: 45,
      },
    },
  };

  expect(receivedData).toEqual(expectedData);
});

test('yml parser', () => {
  const filename = 'file2.yaml';

  const filepath = getFixturePath(filename);

  const extension = getFileExtension(filepath);

  const receivedData = parseFile(filepath, extension);
  const expectedData = {
    common: {
      follow: false,
      setting1: 'Value 1',
      setting3: null,
      setting4: 'blah blah',
      setting5: {
        key5: 'value5',
      },
      setting6: {
        key: 'value',
        ops: 'vops',
        doge: {
          wow: 'so much',
        },
      },
    },
    group1: {
      foo: 'bar',
      baz: 'bars',
      nest: 'str',
    },
    group3: {
      deep: {
        id: {
          number: 45,
        },
      },
      fee: 100500,
    },
  };

  expect(receivedData).toEqual(expectedData);
});
