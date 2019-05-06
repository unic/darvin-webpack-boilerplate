/* eslint-disable */
const inquirer = require('inquirer');
const path = require('path');

const { readFile } = require('../../../webpack/helpers/file-helpers');

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
            case "proxy":
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
        message: 'Select your dev server:',
        choices: rcStruct.devserver,
        when: function(answers) {
          let ret = false;
          switch(cliObj.presets.preset) {
            case "static":
              ret = true;
              break;
            case "proxy":
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
        choices: rcStruct.addons
      },

    ])
    .then(data => {
      let packages = [];

      Object.keys(data).forEach(function(key) {
        if(Array.isArray(data[key])) {
          for (i = 0; i < data[key].length; i++) {
            let selectedObj = rcStruct[key].find(x => x.value === data[key][i]);
            let package = readFile(path.join(process.cwd(), `webpack/${selectedObj.package}`));
            packages.push(package);
          }
        } else {
          let selectedObj = rcStruct[key].find(x => x.value === data[key]);
          let package = readFile(path.join(process.cwd(), `webpack/${selectedObj.package}`));
          packages.push(package);
        }
      })

      let selectedObj = rcStruct.base.find(x => x.value === data.base);
     // let selectedObj = rcStruct.default.find(x => x.value === data.default);

      resolve({ data: data, rcStruct: rcStruct, packages: packages });
    });

  });
}

module.exports = {
  _rc: _rc
};
