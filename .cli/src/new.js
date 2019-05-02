/* eslint-disable */
const inquirer = require('inquirer');
const { setDarvinRC, getSettingsStruct } = require('../../webpack/helpers/config-helpers');
const { copyDemo, setConfig } = require('../../webpack/helpers/scaff-helpers');


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
      name: 'entry',
      message: "define the main entry:",
      default: () => {
        return 'js/main'
      }
    },
    {
      type: 'input',
      name: 'router',
      message: "define the absolute path for prod:",
      default: () => {
        return '/dist'
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
  .then(ansMeta => {
    rc['name'] = ansMeta.name;
    rc['company'] = ansMeta.company;

    _newConfirm(rc, ansMeta);
  });
}

const _newConfirm = (rc, ansMeta) => {
  inquirer
  .prompt([
    {
      type: 'confirm',
      name: 'demo',
      message: 'Add template demo?'
    },
    {
      type: 'confirm',
      name: 'write',
      message: 'Overwrite settings? (.darvinrc)'
    },
  ])
  .then(confirm => {
    if(confirm.write) {

      if(confirm.demo) {

        let activeEngine = rc.settings.html[0];

        if(activeEngine == 'nunjucks') {
          activeEngine = 'njk';
        }

        copyDemo(activeEngine);
        setConfig({
          name: ansMeta.name,
          extIn: activeEngine,
          entry: ansMeta.entry,
          router: ansMeta.router
        })
      }

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
