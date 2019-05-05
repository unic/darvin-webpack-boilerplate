/* eslint-disable */
const path = require('path');
const basePath = process.cwd();

const { writeFile, getDirs, readFile } = require('./../helpers/file-helpers');
const { sortByKey } = require('./../helpers/darvin-helpers');

const setDarvinRC = (rc) => {
  try{
    writeFile(`./.darvinrc.json`, JSON.stringify(rc));
    console.log("DV#> .darvinrc created");
    return true;
  } catch (err){
    console.error(err);
    return false;
  }
},
getDarvinRC = () => {
  let rcArray = [];
  let rcString = '';

  // read darvin rc config
  let rcData = readFile(basePath + '/.darvinrc.json');

  if(!rcData) {
    console.error('DV#> no darvin rc file');
  }

  if(!rcData.settings) {
    return '';
  }

  // get array values and push to string array
  const rcDataVal = Object.values(rcData.settings)
  rcDataVal.forEach((array, i) => {
    if(array.length > 0) {
      rcArray.push(array.join(","));
    }
  });

  // add defaults
  rcString = rcArray.join(",") + ", webpackConfig, settings";

  return rcString;
},
getDarvinSettings = () => {
  let settingsPath = path.resolve(basePath, `webpack/settings`);
  let dirs = getDirs(settingsPath);
  let arr = [];
  let rcArrAlias = getDarvinRC().split(',');

  for (var i = 0; i < dirs.length; i++) {
    let setting = dirs[i];
    let settingConfigPath = path.resolve(settingsPath, setting + '/.dv.settings');
    let settingConfig;

    try{
      settingConfig = readFile(settingConfigPath);
    } catch (err){
      console.error(err);
    }

    settingConfig.path = `./settings/${setting}`;
    settingConfig.package = `./settings/${setting}/package.json`;
    settingConfig.dir = `${setting}`;

    // if active in darvin rc
    if(rcArrAlias.includes(settingConfig.value)) {
      settingConfig.checked = 'true';
    }

    // only import if listed in darvin.rc
    arr.push(settingConfig);
  }

  return arr;
},
getDarvinPresets = () => {
  let settingsPath = path.resolve(basePath, `.cli/.presets`);
  let dirs = getDirs(settingsPath);
  let arr = [];

  for (var i = 0; i < dirs.length; i++) {
    let setting = dirs[i];
    let settingConfigPath = path.resolve(settingsPath, setting + '/.dv.settings');
    let settingConfig;

    try{
      settingConfig = readFile(settingConfigPath);
    } catch (err){
      console.error(err);
    }

    settingConfig.path = `./.cli/.presets/${setting}/.files`;
    settingConfig.package = `./.cli/.presets/${setting}/package.json`;
    settingConfig.dir = `${setting}`;

    // only import if listed in darvin.rc
    arr.push(settingConfig);
  }

  return arr;
},
getSettingsStruct = () => {
  let rcStruct = {};
  let settingsConfig = getDarvinSettings();

  settingsConfig = sortByKey(settingsConfig, 'type');

  settingsConfig.forEach((setting)=>{
    if(!rcStruct[setting.type]) {
      rcStruct[setting.type] = [];
    }
    rcStruct[setting.type].push(setting);
  });

  return rcStruct;
},
createDynamicRequireArray = (rcString) => {
  let settingsPath = path.resolve(basePath, `webpack/settings`);
  let dirs = getDirs(settingsPath);
  let commandArr = [];
  let rcArrAlias = rcString.split(',');

  for (var i = 0; i < dirs.length; i++) {
    let setting = dirs[i];
    let settingConfigPath = path.resolve(settingsPath, setting + '/.dv.settings');
    let settingConfig;

    try{
      settingConfig = readFile(settingConfigPath);
    } catch (err){
      console.error(err);
    }

    settingConfig.path = `./settings/${setting}`;
    settingConfig.dir = `${setting}`;

    // only import if listed in darvin.rc
    if(rcArrAlias.includes(settingConfig.value)) {
      commandArr.push("var { " + process.env.NODE_ENV + ": " + settingConfig.value + " } = require('" + settingConfig.path + "')");
    }
  }

  return commandArr;
};

module.exports = {
  getDarvinRC: getDarvinRC,
  setDarvinRC: setDarvinRC,
  getDarvinSettings: getDarvinSettings,
  getSettingsStruct: getSettingsStruct,
  getDarvinPresets: getDarvinPresets,
  createDynamicRequireArray: createDynamicRequireArray
};
