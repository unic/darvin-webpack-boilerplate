const inquirer = require('inquirer');

const _confirm = (cliObj) => {
  return new Promise((resolve, reject) => {

    inquirer
    .prompt([
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
