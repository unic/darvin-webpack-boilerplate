/* eslint-disable */
const path = require('path');

const { deleteFile } = require('../../webpack/helpers/file-helpers');

const _clean = (response) => {
  deleteFile(path.join(process.cwd(), '/preview'));
  deleteFile(path.join(process.cwd(), '/log'));
  deleteFile(path.join(process.cwd(), '/dist'));
  deleteFile(path.join(process.cwd(), '/src/templates/components'));
  deleteFile(path.join(process.cwd(), '/src/templates/layouts'));
  deleteFile(path.join(process.cwd(), '/src/templates/pages'));
  deleteFile(path.join(process.cwd(), '/src/templates/modules'));
  deleteFile(path.join(process.cwd(), '/src/templates/index.njk'));
  deleteFile(path.join(process.cwd(), '/src/templates/index.twig'));
}

module.exports = {
  _clean: _clean
};
