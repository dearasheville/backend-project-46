import path from 'path';

import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

import buildAST from '../src/build.js';
import parseFile from '../src/parsers.js';

import { getFileExtension } from '../src/utils.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('build AST', () => {
  const filename1 = 'file1.json';
  const filename2 = 'file2.json';

  const filepath1 = getFixturePath(filename1);
  const filepath2 = getFixturePath(filename2);

  const extension1 = getFileExtension(filepath1);
  const extension2 = getFileExtension(filepath2);

  const data1 = parseFile(filepath1, extension1);
  const data2 = parseFile(filepath2, extension2);

  const receivedData = buildAST(data1, data2);
  const expectedData = [
    {
      key: 'common',
      children: [
        {
          type: 'unchanged',
          key: 'setting1',
          previousValue: 'Value 1',
          newValue: 'Value 1',
        },
        {
          type: 'deleted',
          key: 'setting2',
          previousValue: 200,
        },
        {
          type: 'changed',
          key: 'setting3',
          previousValue: true,
          newValue: null,
        },
        {
          key: 'setting6',
          children: [
            {
              type: 'unchanged',
              key: 'key',
              previousValue: 'value',
              newValue: 'value',
            },
            {
              key: 'doge',
              children: [
                {
                  type: 'changed',
                  key: 'wow',
                  previousValue: '',
                  newValue: 'so much',
                },
              ],
            },
            {
              type: 'added',
              key: 'ops',
              newValue: 'vops',
            },
          ],
        },
        {
          type: 'added',
          key: 'follow',
          newValue: false,
        },
        {
          type: 'added',
          key: 'setting4',
          newValue: 'blah blah',
        },
        {
          type: 'added',
          key: 'setting5',
          newValue: {
            key5: 'value5',
          },
        },
      ],
    },
    {
      key: 'group1',
      children: [
        {
          type: 'changed',
          key: 'baz',
          previousValue: 'bas',
          newValue: 'bars',
        },
        {
          type: 'unchanged',
          key: 'foo',
          previousValue: 'bar',
          newValue: 'bar',
        },
        {
          type: 'changed',
          key: 'nest',
          previousValue: {
            key: 'value',
          },
          newValue: 'str',
        },
      ],
    },
    {
      type: 'deleted',
      key: 'group2',
      previousValue: {
        abc: 12345,
        deep: {
          id: 45,
        },
      },
    },
    {
      type: 'added',
      key: 'group3',
      newValue: {
        deep: {
          id: {
            number: 45,
          },
        },
        fee: 100500,
      },
    },
  ];

  expect(receivedData).toEqual(expectedData);
});
