/* eslint-disable */
const inquirer = require('inquirer');

const _meta = (cliObj) => {
  return new Promise((resolve, reject) => {

    inquirer
    .prompt([
      {
        type: 'input',
        name: 'entry',
        message: "define the main entry:",
        default: () => {
          return 'js/main'
        }
      },
      {
        type: 'input',
        name: 'routerDev',
        message: "define the absolute path for dev:",
        default: () => {
          if(cliObj.presets.preset === 'drupal8') return '/themes/unic/dist/';
          return '';
        },
        when: () => {
          return cliObj.presets.preset !== 'spa'
        }
      },
      {
        type: 'input',
        name: 'routerProd',
        message: "define the absolute path for prod:",
        default: () => {
          if(cliObj.presets.preset === 'drupal8') return '/themes/unic/dist/';
          return '/dist';
        },
        when: () => {
          return cliObj.presets.preset !== 'spa'
        }
      },
      {
        type: 'input',
        name: 'name',
        message: "Type the project name:",
        default: () => {
          return 'Darvin'
        }
      },
      {
        type: 'input',
        name: 'company',
        message: "Type the company name:"
      }
    ])
    .then(data => {
      resolve(data);
    });

  });
}

module.exports = {
  _meta: _meta
};
