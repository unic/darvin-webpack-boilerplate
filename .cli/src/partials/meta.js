const inquirer = require('inquirer');

const _meta = (cliObj) => {
  return new Promise((resolve) => {

    inquirer
    .prompt([
      {
        type: 'input',
        name: 'entry',
        message: "define the main entry:",
        default: () => {
          return 'scripts/main'
        }
      },
      {
        type: 'input',
        name: 'routerDev',
        message: "asset path for develop (empty for devserver):",
        default: () => {
          if(cliObj.presets.preset === 'proxy') return '/themes/unic/dist/';
          return '';
        }
      },
      {
        type: 'input',
        name: 'routerProd',
        message: "asset path for production:",
        default: () => {
          if(cliObj.presets.preset === 'proxy') return '/themes/unic/dist/';
          return '/htdocs/frontend/';
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
          return '8001';
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
        message: "Type the company name:",
        default: () => {
          return 'Unic AG'
        }
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
