/* eslint-disable */
const { _presets } = require('./partials/presets');
const { _rc } = require('./partials/rc');
const { _meta } = require('./partials/meta');
const { _confirm } = require('./partials/confirm');

const { search } = require('./helpers/cli-helpers');
const { getSettingsStruct, setDarvinRC } = require('../../webpack/helpers/config-helpers');
const { setConfig } = require('../../webpack/helpers/scaff-helpers');

let cliObj = {};


const _init = () => {
  cliObj = {};
  setPresets();
}


const setPresets = () => {
  const setPresets = _presets(cliObj);

  setPresets.then(hookPresets, data => {
    console.error('DV#> error in presets.')
  });
},
hookPresets = (data) => {
  cliObj.presets = data;
  setRc();
}


const setRc = () => {
  let rcStruct = getSettingsStruct();
  const setRc = _rc(cliObj, rcStruct);

  setRc.then(hookRc, data => {
    console.error('DV#> error in rc.')
  });
},
hookRc = (resultObj) => {
  let data = resultObj.data;
  let rcStruct = resultObj.rcStruct;

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

  // save transformed rc settings
  cliObj.rcSettings = data;

  _setMeta();
};


const _setMeta = () => {
  const setMeta = _meta(cliObj);

  setMeta.then(hookMeta, data => {
    console.error('DV#> error in meta.')
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
    console.error('DV#> error in confirm.')
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
      activeEngine = cliObj.rc.html[0];
      if(activeEngine == 'nunjucks') {
        activeEngine = 'njk';
      }

      if(cliObj.confirm.demo) {
        copyDemo(activeEngine);
      }

      copyPreview(activeEngine);
    }

    console.log("DV#> write settings");

    setConfig({
      name: cliObj.meta.name,
      extIn: activeEngine,
      entry: cliObj.meta.entry,
      routerProd: cliObj.meta.routerProd,
      routerDev: cliObj.meta.routerDev
    })

    setDarvinRC(cliObj.rc);
  } else {
    console.log("DV#> cancel settings");
  }
}


module.exports = {
  _init: _init
};
