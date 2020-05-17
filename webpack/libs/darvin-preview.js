const path = require('path');
const basePath = process.cwd();

const fs = require('fs-extra');
const crypto = require('crypto');

const { getTemplateFiles, getSVGIcons } = require('../helpers/darvin-helpers');
const { writeFile, getDirs } = require('../helpers/file-helpers');

let webpackEntryObj = {},
    previewIndexObj = {
      types: [],
      payload: {}
    },
    dir = path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}`),
    webpackEntryDefault = [`./${global.inputDirs.src}/${global.inputDirs.scripts}/main.js`];

// get all categories
previewIndexObj.types = getDirs(dir);

// exclude config folder from types
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'config');
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'layouts');
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'helpers');

// create payloads by types
previewIndexObj.types.forEach((type) => {
  previewIndexObj.payload[type] = {};

  fs.readdirSync(path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${type}`)).forEach((file) => {

    // only accept files not starting with _ or .
    if (fs.lstatSync(path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}`)).isDirectory() && file.charAt(0) !== '_' && file.charAt(0) !== '.') {
      let templateObj = getTemplateFiles(type, file);

      // check if template file exist
      if(templateObj.template) {
        let tmplPath = templateObj.template.substring(0, templateObj.template.lastIndexOf('/')).replace(`${global.inputDirs.src}/${global.inputDirs.templates}/`, ``);
        let config = {};

        previewIndexObj.payload[type][file] = {
          id: crypto.createHash('md5').update(file).digest("hex"),
          name: file,
          type: type,
          chunkName: `scripts/main`,
          template: templateObj.template,
          templateRel: templateObj.template.replace(`${global.inputDirs.src}/${global.inputDirs.templates}/`, ``),
          target: `${tmplPath}/${file}.html`,
          path: tmplPath,
          previews: templateObj.previews,
          variants: templateObj.previews.length,
          server: global.server,
          env: process.env.DARVIN_ENV,
          mode: process.env.NODE_ENV
        }

        if (type === 'pages') {
          previewIndexObj.payload[type][file].previews = [`${file}`];
          previewIndexObj.payload[type][file].variants = 1;
        }

        if (templateObj.previews.length == 0) {
          previewIndexObj.payload[type][file].chunkName = 'scripts/main';
        }

        // load element config file
        try {
          config = require(path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${tmplPath}/meta/config.json`));
        } catch (e) {
          if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
            // console.error("no config for " + path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${tmplPath}/meta/config.json`));
          } else {
            throw e;
          }
        }

        previewIndexObj.payload[type][file].config = config;

       /* const jsPath = `./src/templates/${type}/${file}/main.js`;
        let name = `${type}/${file}/${file}`;

        // create entry if element js exist
        try {
          if (fs.existsSync(jsPath)) {
            webpackEntryObj[name] = [];

            // add to default preview entrys
            let entry = webpackEntryDefaultPreview.slice(0);
            entry.push(jsPath);

            webpackEntryDefault.push(jsPath);
            webpackEntryObj[name] = entry;

            // set chunk
            previewIndexObj.payload[type][file].chunkName = `${tmplPath}/${file}`;
          }
        } catch (err) { }*/
      }

    }

  });
});

// add default main and preview entry
webpackEntryObj['scripts/main'] = webpackEntryDefault;

if (!fs.existsSync('./log')){
  fs.mkdirSync('./log');
}

writeFile(`./log/entry.report.json`, JSON.stringify(webpackEntryObj));

// get icons
let allIconsInDir = getSVGIcons();

module.exports = {
  webpackEntryObj: webpackEntryObj,
  previewIndexObj: previewIndexObj,
  allIconsInDir: allIconsInDir
};
