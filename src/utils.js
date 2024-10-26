import path from 'path';

const extensions = {
  '.json': 'json',
  '.yaml': 'yaml',
  '.yml': 'yaml',
};

const getAblsolutePath = (filepath) => path.resolve(filepath);

const getFileExtension = (filepath) => extensions[path.extname(filepath)];

export {
  getAblsolutePath,
  getFileExtension,
};
