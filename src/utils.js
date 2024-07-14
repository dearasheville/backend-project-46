import path from 'path';

const extensions = {
  '.json': 'json',
  '.yml': 'yaml',
  '.yaml': 'yaml',
};

const getAblsolutePath = (filepath) => path.resolve(filepath);

const getFileExtension = (filepath) => extensions[path.extname(filepath)];

export {
  getAblsolutePath,
  getFileExtension,
};
