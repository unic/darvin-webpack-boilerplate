/* eslint-disable */
const path = require('path');
var merge = require('deepmerge');

const { _presets } = require('./partials/presets');
const { _rc } = require('./partials/rc');
const { _meta } = require('./partials/meta');
const { _confirm } = require('./partials/confirm');

const { search } = require('./helpers/cli-helpers');
const { getSettingsStruct, setDarvinRC } = require('../../webpack/helpers/config-helpers');
const { readFile, writeFile } = require('../../webpack/helpers/file-helpers');
const { setConfig, copyDemo, copyPreview } = require('../../webpack/helpers/scaff-helpers');

let cliObj = {};
let cliPackages = [];


const _init = () => {
  cliObj = {};
  cliPackages.push(readFile(path.join(process.cwd(), `package.json`)));
  setPresets();
}


const setPresets = () => {
  const setPresets = _presets(cliObj);

  setPresets.then(hookPresets, data => {
    console.error('DV#> error in presets.');
    process.exit();
  });
},
hookPresets = (resultObj) => {
  // store values
  cliObj.presets = resultObj.data;

  // push package.json
  cliPackages.push(resultObj.package);
  setRc();
}


const setRc = () => {
  let rcStruct = getSettingsStruct();
  const setRc = _rc(cliObj, rcStruct);

  setRc.then(hookRc, data => {
    console.error('DV#> error in rc.');
    process.exit();
  });
},
hookRc = (resultObj) => {
  // store values
  let data = resultObj.data;
  let rcStruct = resultObj.rcStruct;
  let packages = resultObj.packages;

  // merge rc packages
  cliPackages = cliPackages.concat(packages);

  cliObj.rc = data;

  // loop settings
  Object.keys(data).forEach(key => {

    // transform single strings to array
    if(!Array.isArray(data[key])) {
      data[key] = [data[key]];
    }

    let value = data[key];

    for(var i = 0; i < data[key].length; i++) {
      data[key][i] = search(value[i], rcStruct)[0];
    }
  });

  if(cliObj.presets.preset === 'proxy') {
    data.settings.html = ['browsersync'];
  }

  // save transformed rc settings
  cliObj.rcSettings = data;

  _setMeta();
};


const _setMeta = () => {
  const setMeta = _meta(cliObj);

  setMeta.then(hookMeta, data => {
    console.error('DV#> error in meta.');
    process.exit();
  });
},
hookMeta = (data) => {
  cliObj.meta = data;

  // create rc object
  let rc = {};
  rc['settings'] = cliObj.rcSettings;
  rc['name'] = data.name;
  rc['company'] = data.company;

  // store rc object
  cliObj.rc = rc;

  _setConfirm(rc);
};


const _setConfirm = () => {
  const setConfirm = _confirm(cliObj);

  setConfirm.then(hookConfirm, data => {
    console.error('DV#> error in confirm.');
    process.exit();
  });
},
hookConfirm = (data) => {
  cliObj.confirm = data;
  _action();
};


const _action = () => {
  if(cliObj.confirm.write) {

    let activeEngine = 'html';

    if(cliObj.confirm.preview) {
      activeEngine = cliObj.rc.settings.html[0];
      if(activeEngine == 'nunjucks') {
        activeEngine = 'njk';
      }

      if(cliObj.confirm.demo) {
        copyDemo(activeEngine);
      }

      copyPreview(activeEngine);

      let package = readFile(path.join(process.cwd(), `.cli/.preview/.scripts/package.json`));
      cliPackages.push(package);
    }

    setConfig({
      name: cliObj.meta.name,
      extIn: activeEngine,
      entry: cliObj.meta.entry,
      routerProd: cliObj.meta.routerProd,
      routerDev: cliObj.meta.routerDev,
      proxy: cliObj.meta.proxy,
      port: cliObj.meta.port
    })

    setDarvinRC(cliObj.rc);

    writeFile(path.join(process.cwd(), `package.json`), JSON.stringify(merge.all(cliPackages)) );

    console.log("DV#> 🔥 continue by typing 'npm start'");
  } else {
    console.log("DV#> 🤡 cancel settings");
  }
}


module.exports = {
  _init: _init
};
