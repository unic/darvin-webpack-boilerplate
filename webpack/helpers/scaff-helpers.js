/* eslint-disable */
const path = require('path');
const basePath = process.cwd();

const copyScaffolding = require('./copy-template-dir');
const fs = require('fs-extra');

const { capitalize } = require('./../helpers/darvin-helpers');
const { getDirs, deleteFile, fsCopy } = require('./../helpers/file-helpers');

const getScaffoldingOptions = () => {
  let settingsPath = path.resolve(basePath, `.cli/.scaffold/`);
  let dirs = getDirs(settingsPath);
  let retArr = [];

  dirs.forEach((dir, i) => {
    let obj = { name: dir.substring(1)};

    if(dir.substring(1).toLowerCase()==='pages') {
      obj['disabled'] = 'temporary disabled';
    }
    retArr.push(obj);
  });

  return retArr;
},
setScaffolding = (response, confirm) => {
  const vars = {
    name: response.name,
    cat: capitalize(response.category),
    authorName: response.authorName,
    authorEmail: response.authorEmail,
    tickets: response.tickets,
    projectSpace: response.projectSpace,
    design: response.design
  }

  const inDir = path.join(process.cwd(), `.cli/.scaffold/.${response.category}/.${global.template.extIn}`)
  const outDir = path.join(process.cwd(), `src/templates/${response.category}/${response.name}`)

  copyDirectoryWithContext(confirm, inDir, outDir, vars, response);
},
copyDirectoryWithContext = (confirm, inDir, outDir, vars, response) => {
  copyScaffolding(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err
  })
},
getNextIncrementalNumber = (type) => {
  let settingsPath = path.resolve(basePath, `src/templates/${type}`);

  let dirs = getDirs(settingsPath);
  let alpha = type.charAt(0);
  let numeric, highestNumber = 0;

  if(dirs.length < 1) {
    return `${alpha}00-`;
  }

  Number.prototype.pad = function(size) {
    var s = String(this);
    while (s.length < (size || 2)) {s = "0" + s;}
    return s;
  }

  dirs.forEach((dir, i) => {
    let splitName = dir.split('-');
    if(splitName[1]) {
      alpha = splitName[0].replace(/[0-9]/g, '');
      numeric = splitName[0].replace(/\D/g,'');
      if(numeric.length > 0 && numeric > highestNumber) {
        highestNumber = numeric;
      }
    }
  });

  highestNumber++;

  return `${alpha}${highestNumber.pad(2)}-`;
},
copyDemo = (engine, framework) => {
  fsCopy(path.join(process.cwd(), `.cli/.preview/.demo/.styles`), path.join(process.cwd(), `src`), 'style files added');
  fsCopy(path.join(process.cwd(), `.cli/.preview/.demo/.templates/.${engine}`), path.join(process.cwd(), `src`), 'template files added');
  fsCopy(path.join(process.cwd(), `.cli/.preview/.demo/.scripts/.${framework !== '' ? 'default' : framework}`), path.join(process.cwd(), `src`), 'script files added');
},
copyPreview = (engine) => {
  fsCopy(path.join(process.cwd(), `.cli/.preview/.index/.${engine}/index.${engine}`), path.join(process.cwd(), `src/templates/index.${engine}`), 'preview index updated');
  fsCopy(path.join(process.cwd(), `.cli/.preview/.files`), process.cwd(), 'preview files updated');
  fsCopy(path.join(process.cwd(), `.cli/.preview/.layouts/.${engine}`), path.join(process.cwd(), `src/templates/layouts`), 'preview layouts updated');
},
copyProxy = () => {
  fsCopy(path.join(process.cwd(), `.cli/.presets/.proxy/.files/`), process.cwd(), 'add proxy settings');
},
setConfig = (data) => {
  const inDir = path.join(process.cwd(), `.cli/.config`);
  const outDir = path.join(process.cwd(), `config`);

  copyConfigFile(inDir, outDir, data);
},
copyConfigFile = (inDir, outDir, vars) => {
  copyScaffolding(inDir, outDir, vars, (err, createdFiles) => {
    if (err) {
      console.log('error in copyScaffolding');
      throw err
    }
  })
};

module.exports = {
  getScaffoldingOptions: getScaffoldingOptions,
  setScaffolding: setScaffolding,
  getNextIncrementalNumber: getNextIncrementalNumber,
  copyDemo: copyDemo,
  copyPreview: copyPreview,
  copyProxy: copyProxy,
  setConfig: setConfig
};
