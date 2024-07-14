import fs from 'fs';

import yaml from 'js-yaml';

const readFile = (filepath) => fs.readFileSync(filepath, 'utf-8');

const parsers = {
  json: (filepath) => JSON.parse(readFile(filepath)),
  yaml: (filepath) => yaml.load(readFile(filepath)),
};

const parseFile = (filepath, extension) => parsers[extension](filepath);

export default parseFile;
