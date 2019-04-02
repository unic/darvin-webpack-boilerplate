/* eslint-disable */
const inquirer = require('inquirer');
const { setDarvinRC, getSettingsStruct } = require('../../webpack/helpers/config-helpers');

let search = (needle, haystack, found = []) => {
  Object.keys(haystack).forEach((key) => {
    if(haystack[key] === needle){
      found.push(haystack.alias);
      return found;
    }
    if(typeof haystack[key] === 'object'){
      search(needle, haystack[key], found);
    }
  });
  return found;
};

const _new = () => {
  let rcStruct = getSettingsStruct();

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
      choices: rcStruct.html
    },
    {
      type: 'list',
      name: 'devserver',
      message: 'Select the dev server:',
      choices: rcStruct.server
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
  .then(rcSettings => {

    let rcObject = {};

    // loop settings
    Object.keys(rcSettings).forEach(key => {

      // transform single strings to array
      if(!Array.isArray(rcSettings[key])) {
        rcSettings[key] = [rcSettings[key]];
      }

      let value = rcSettings[key];

      for(var i = 0; i < rcSettings[key].length; i++) {
        rcSettings[key][i] = search(value[i], rcStruct)[0]; //search(transformedVal[i], rcStruct);
      }
    });

    _newMeta(rcSettings);
  });
}

const _newMeta = (rcSettings) => {
  let rc = {};
  rc['settings'] = rcSettings;

  inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: "Type the project name:"
    },
    {
      type: 'input',
      name: 'company',
      message: "Type the company name:"
    }
  ])
  .then(answer => {
    rc['name'] = answer.name;
    rc['company'] = answer.company;
    console.log(JSON.stringify(rc, null, '  '));
    _newConfirm(rc);
  });
}

const _newConfirm = (rc) => {
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'write',
      message: 'Overwrite settings? (.darvinrc)'
    },
  ])
  .then(confirm => {
    if(confirm.write) {
      console.log("DV#> write settings");
      setDarvinRC(rc);
    } else {
      console.log("DV#> cancel settings");
    }
  });
}

module.exports = {
  _new: _new
};
