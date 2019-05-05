/* eslint-disable */
const inquirer = require('inquirer');

const _rc = (cliObj, rcStruct) => {
  return new Promise((resolve, reject) => {

    inquirer
    .prompt([
      {
        type: 'list',
        name: 'base',
        message: 'Select the entry base:',
        choices: rcStruct.base
      },
      {
        type: 'checkbox',
        message: 'Select the default loaders:',
        name: 'default',
        choices: rcStruct.default,
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one loader.';
          }

          return true;
        }
      },
      {
        type: 'list',
        name: 'html',
        message: 'Select the template engine:',
        choices: rcStruct.html,
        validate: function(answer) {
          if (answer.length < 1) {
            return 'You must choose at least one loader.';
          }

          return true;
        },
        when: function(answers) {
          let ret = false;
          switch(cliObj.presets.preset) {
            case "static":
              ret = true;
              break;
            case "drupal8":
              ret = false;
              break;
            case "spa":
              ret = false;
              break;
          }
          return ret;
        }
      },
      {
        type: 'list',
        name: 'devserver',
        message: 'Select the dev server:',
        choices: rcStruct.server,
        when: function(answers) {
          let ret = false;
          switch(cliObj.presets.preset) {
            case "static":
              ret = true;
              break;
            case "drupal8":
              ret = false;
              break;
            case "spa":
              ret = false;
              break;
          }
          return ret;
        }
      },
      {
        type: 'checkbox',
        message: 'Select the framework:',
        name: 'framework',
        choices: rcStruct.framework
      },
      {
        type: 'checkbox',
        message: 'Select the addons:',
        name: 'addons',
        choices: rcStruct.addon
      },

    ])
    .then(data => {
      resolve({ data: data, rcStruct: rcStruct});
    });

  });
}

module.exports = {
  _rc: _rc
};
