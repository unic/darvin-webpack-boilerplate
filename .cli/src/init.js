const path = require('path');
const sortPackageJson = require('sort-package-json');
const merge = require('deepmerge');

const { _presets } = require('./partials/presets');
const { _rc } = require('./partials/rc');
const { _meta } = require('./partials/meta');
const { _confirm } = require('./partials/confirm');

const { search } = require('./helpers/cli-helpers');
const { getSettingsStruct, writeDarvinRC } = require('../../webpack/helpers/config-helpers');
const { readFile, writeFile, deleteDir, fileExist, deleteFile } = require('../../webpack/helpers/file-helpers');
const { setConfig, copyDemo, copyProxy, copyPreview } = require('../../webpack/helpers/scaff-helpers');

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

  // bind browsersync for third party
  if(cliObj.presets.preset === 'proxy') {
    let package = readFile(path.join(process.cwd(), `webpack/settings/env-browsersync/package.json`));
    cliPackages.push(package);
    data.devserver = ['browsersync'];

    copyProxy();
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

    // add preview and samples
    if(cliObj.presets.preset === 'static') {
      activeEngine = cliObj.rc.settings.html[0];
      if(activeEngine == 'nunjucks') {
        activeEngine = 'njk';
      }

      copyDemo(activeEngine, cliObj.rc.settings.framework[0]);

      // add glsl loader for manual demo
      if(cliObj.rcSettings.addons.indexOf("glsl") < 0) {
        cliObj.rcSettings.addons.push('glsl');
        let glslPackages = readFile(path.join(process.cwd(), `webpack/settings/addon-glsl/package.json`));
        cliPackages.push(glslPackages);
      }

      copyPreview(activeEngine);

      let package = readFile(path.join(process.cwd(), `.cli/.preview/.scripts/package.json`));
      cliPackages.push(package);
    }

    let configVars = {
      name: cliObj.meta.name ? cliObj.meta.name : 'Darvin Boilerplate',
      extIn: activeEngine ? activeEngine : 'njk',
      entry: cliObj.meta.entry ? cliObj.meta.entry : 'scripts/main',
      routerProd: cliObj.meta.routerProd ? cliObj.meta.routerProd : '/htdocs/frontend/',
      routerDev: cliObj.meta.routerDev ? cliObj.meta.routerDev : '',
      proxy: cliObj.meta.proxy ? cliObj.meta.proxy : '',
      port: cliObj.meta.port ? cliObj.meta.port : '8001'
    };

    setConfig(configVars)

    // write Darvin RC File
    writeDarvinRC(cliObj.rc);

    let mergedPackageJson = merge.all(cliPackages),
        mergedPackageJsonStr = JSON.stringify(sortPackageJson(mergedPackageJson), null, 2);

    // merge all packages
    writeFile(path.join(process.cwd(), `package.json`), mergedPackageJsonStr );

    // remove git dir if no darvin.lock file exist
    if(!fileExist(path.join(process.cwd(), `darvin.lock`))) {
      deleteDir(path.join(process.cwd(), `.git`));
    }

    // delete empty index.html
    deleteFile(path.join(process.cwd(), '/src/templates/index.html'));

    console.log("DV#> 🔥 continue by typing 'npm start'");
  } else {
    console.log("DV#> 🤡 cancel settings");
  }
}


module.exports = {
  _init: _init
};
