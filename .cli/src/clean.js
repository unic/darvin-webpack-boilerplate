const path = require('path');

const { deleteFile } = require('../../webpack/helpers/file-helpers');

const _clean = (response) => {
  deleteFile(path.join(process.cwd(), '/preview'));
  deleteFile(path.join(process.cwd(), '/log'));
  deleteFile(path.join(process.cwd(), '/dist'));
  deleteFile(path.join(process.cwd(), '/src/templates/pages/p00-manual'));
  deleteFile(path.join(process.cwd(), '/src/templates/modules/m01-header'));
  deleteFile(path.join(process.cwd(), '/src/templates/modules/m02-footer'));
  deleteFile(path.join(process.cwd(), '/src/templates/modules/m03-background'));
  deleteFile(path.join(process.cwd(), '/src/templates/modules/m04-manual'));
  deleteFile(path.join(process.cwd(), '/src/templates/index.njk'));
  deleteFile(path.join(process.cwd(), '/src/templates/index.twig'));
}

module.exports = {
  _clean: _clean
};
