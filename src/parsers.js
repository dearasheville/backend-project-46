import fs from 'fs';

import yaml from 'js-yaml';

const toReadAndParse = {
  json: (path) => JSON.parse(fs.readFileSync(path, 'utf-8')),
  yaml: (path) => yaml.load(fs.readFileSync(path, 'utf-8')),
};

const parser = (path, extension) => toReadAndParse[extension](path);

export default parser;
