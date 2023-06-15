import fix from '../src/fix.js';

test('fix', () => {
  expect(fix(1, 2)).toEqual(3);
});
