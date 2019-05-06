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
          if(cliObj.presets.preset === 'proxy') return '/themes/unic/dist/';
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
          if(cliObj.presets.preset === 'proxy') return '/themes/unic/dist/';
          return '/dist';
        },
        when: () => {
          return cliObj.presets.preset !== 'spa'
        }
      },
      {
        type: 'input',
        name: 'proxy',
        message: "type the proxy url:",
        default: () => {
          if(cliObj.presets.preset === 'proxy') return 'unic.local';
          return '';
        },
        when: () => {
          return cliObj.presets.preset === 'proxy'
        }
      },
      {
        type: 'input',
        name: 'port',
        message: "type the dev port:",
        default: () => {
          if(cliObj.presets.preset === 'proxy') return '3000';
          return '7001';
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
