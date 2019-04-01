/* eslint-disable */
const path = require('path');
const basePath = process.cwd();

const { writeFile, getDirs, readFile } = require('./../helpers/file-helpers');

const setDarvinRC = (rc) => {
  try{
    writeFile(`./.darvinrc.json`, JSON.stringify(rc));
    console.log("DV#> success!");
    return true;
  } catch (err){
    console.error(err);
    return false;
  }
},
getDarvinRC = () => {
  let rcArray = [];
  let rcString = '';

  let rcData = readFile(basePath + '/.darvinrc.json');

  if(!rcData) {
    console.error('no darvin rc file');
  }

  const rcDataVal = Object.values(rcData.settings)
  rcDataVal.forEach((array, i) => {
    rcArray.push(array.join(","));
  });

  rcString = rcArray.join(",") + ", webpackConfig, settings";

  return rcString;
},
getSettingsConfig = () => {
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
    settingConfig.dir = `${setting}`;

    // if active in darvin rc
    if(rcArrAlias.includes(settingConfig.alias)) {
      settingConfig.checked = 'true';
    }

    // only import if listed in darvin.rc
    arr.push(settingConfig);
  }

  return arr;
},
getSettingsStruct = () => {
  let rcStruct = {};
  let settingsConfig = getSettingsConfig();

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
    if(rcArrAlias.includes(settingConfig.alias)) {
      commandArr.push("var { dev: " + settingConfig.alias + " } = require('" + settingConfig.path + "')");
    }
  }

  return commandArr;
};

module.exports = {
  getDarvinRC: getDarvinRC,
  setDarvinRC: setDarvinRC,
  getSettingsConfig: getSettingsConfig,
  createDynamicRequireArray: createDynamicRequireArray
};
