import fs from 'fs';

import gendiff from '../src/gendiff.js';

test('gendiff', () => {
  const difference = gendiff('./__fixtures__/file1.json', './__fixtures__/file2.json');
  const result = fs.readFileSync('./__fixtures__/result.txt', 'utf-8');

  console.log(result);

  expect(difference).toEqual(result);
});
