const inquirer = require('inquirer');
const path = require('path');

const { getDarvinPresets } = require('../../../webpack/helpers/config-helpers');
const { readFile } = require('../../../webpack/helpers/file-helpers');

const _presets = (cliObj) => {
  return new Promise((resolve, reject) => {
    let presets = getDarvinPresets();

    inquirer
    .prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Select your presets:',
        choices: presets,
        default: 'static'
      }
    ])
    .then((data) => {
      let selectedObj = presets.find(x => x.value === data.preset);
      let package = readFile(path.join(process.cwd(), `${selectedObj.package}`));

      resolve({ data: data, package: package });
    });
  });
}

module.exports = {
  _presets: _presets
};
