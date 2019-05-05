/* eslint-disable */
const inquirer = require('inquirer');
const { getDarvinPresets } = require('../../../webpack/helpers/config-helpers');

const _presets = (cliObj) => {
  return new Promise((resolve, reject) => {
    let presets = getDarvinPresets();

    inquirer
    .prompt([
      {
        type: 'list',
        name: 'preset',
        message: 'Select your presets:',
        choices: presets
      }
    ])
    .then((data) => {
      console.log(data);
      resolve(data);
    });
  });
}

module.exports = {
  _presets: _presets
};
