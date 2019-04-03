/* eslint-disable */
const path = require('path');
const basePath = process.cwd();

const copyScaffolding = require('./copy-template-dir');

const { capitalize } = require('./../helpers/darvin-helpers');
const { getDirs } = require('./../helpers/file-helpers');

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

  const inDir = path.join(process.cwd(), `.cli/.scaffold/.${response.category}/.njk`)
  const outDir = path.join(process.cwd(), `src/templates/${response.category}/${response.name}`)

  copyDirectoryWithContext(confirm, inDir, outDir, vars);
},
copyDirectoryWithContext = (confirm, inDir, outDir, vars) => {
  copyScaffolding(inDir, outDir, vars, (err, createdFiles) => {
    if (err) throw err

    if(!confirm.preview) {
      deleteFile(basePath + `/src/templates/${response.category}/${response.name}/${response.name}.preview.1.njk`);
    }

    if(!confirm.js) {
      deleteFile(basePath + `/src/templates/${response.category}/${response.name}/main.js`);
      deleteFile(basePath + `/src/templates/${response.category}/${response.name}/index.js`);
    }
  })
};

module.exports = {
  getScaffoldingOptions: getScaffoldingOptions,
  setScaffolding: setScaffolding
};
