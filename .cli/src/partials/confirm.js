/* eslint-disable */
const inquirer = require('inquirer');

const _confirm = (cliObj) => {
  return new Promise((resolve, reject) => {

    inquirer
    .prompt([
      {
        type: 'confirm',
        name: 'preview',
        message: 'Add frontend preview?',
        when: () => {
          return cliObj.presets.preset === 'static'
        }
      },
      {
        type: 'confirm',
        name: 'demo',
        message: 'Add sample files?',
        when: (data) => {
          return data.preview
        }
      },
      {
        type: 'confirm',
        name: 'write',
        message: 'Write settings?',
      },
    ])
    .then(data => {
      resolve(data);
    });

  });
}

module.exports = {
  _confirm: _confirm
};
