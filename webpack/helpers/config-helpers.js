const path = require('path');
const basePath = process.cwd();

const { writeFile, getDirs, readFile } = require('./../helpers/file-helpers');
const { sortByKey } = require('./../helpers/darvin-helpers');

const writeDarvinRC = (rc) => {
  try{
    console.log("DV#> write darvinrc to /config");
    writeFile(`./config/.darvinrc.modern.json`, JSON.stringify(rc));
    return true;
  } catch (err){
    console.log('error in writeDarvinRC');
    console.error(err);
    process.exit();
  }
},
getDarvinRC = () => {
  let rcArray = [];
  let rcString = '';
  let settingsPath = path.resolve(basePath, `webpack/settings`);
  let dirs = getDirs(settingsPath);
  let rcData;
  let darvinEnv = process.env.DARVIN_ENV;
  if(!darvinEnv) {
    darvinEnv = 'darvinrc.modern';
  }

  // read darvin rc config
  rcData = readFile(basePath + `/config/.${darvinEnv}.json`);

  if(!rcData) {
    console.error(`DV#> file .${darvinEnv}.json not found in config directory`);
    process.exit();
  }

  if(!rcData.settings) {
    return '';
  }

  // get array values and push to string array
  const rcDataVal = Object.values(rcData.settings);
  rcDataVal.forEach((array, i) => {
    if(array.length > 0) {
      array.forEach((item, i) => {
        for (var i = 0; i < dirs.length; i++) {
          let setting = getDarvinSettingFile(dirs[i]);

          // push only if setting exist
          if(setting.value === item) {
            rcArray.push(item);
          }
        }
      });
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
      process.exit();
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
getDarvinSettingFile = (settingName) => {
  let settingsPath = path.resolve(basePath, `webpack/settings`);
  let settingConfigPath = path.resolve(settingsPath, settingName + '/.dv.settings');
  let json;

  try{
    json = readFile(settingConfigPath);
  } catch (err){
    console.error(err);
    return { value: '' };
  }

  return json;
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
      process.exit();
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
      process.exit();
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
  writeDarvinRC: writeDarvinRC,
  getDarvinSettings: getDarvinSettings,
  getSettingsStruct: getSettingsStruct,
  getDarvinPresets: getDarvinPresets,
  createDynamicRequireArray: createDynamicRequireArray
};
