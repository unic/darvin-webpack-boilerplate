/* eslint-disable */
const path = require('path');
const basePath = process.cwd();

const fs = require('fs');
const simpleGit = require('simple-git')(basePath);
const crypto = require('crypto');

const { filterCommitsInDateRange, getTemplateFiles, getSVGIcons } = require('../helpers/darvin-helpers');
const { writeTemplateDependencies } = require('../helpers/nunjucks-helpers');
const { writeFile, getDirs } = require('../helpers/file-helpers');

let webpackEntryObj = {},
    previewIndexObj = {
      types: [],
      payload: {}
    },
    dir = path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}`),
    webpackEntryDefault = [`./${global.inputDirs.src}/${global.inputDirs.js}/main.js`],
    activityDays = 20,
    endDate = new Date(),
    startDate = new Date(endDate.getTime() - (activityDays * 24 * 60 * 60 * 1000));

// get all categories
previewIndexObj.types = getDirs(dir);

// exclude config folder from types
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'config');
previewIndexObj.types = previewIndexObj.types.filter(type => type !== 'layouts');

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
          chunkName: `js/main`,
          template: templateObj.template,
          templateRel: templateObj.template.replace(`${global.inputDirs.src}/${global.inputDirs.templates}/`, ``),
          target: `${tmplPath}/${file}.html`,
          path: tmplPath,
          previews: templateObj.previews,
          variants: templateObj.previews.length
        }

        if (type === 'pages') {
          previewIndexObj.payload[type][file].previews = [`${file}`];
          previewIndexObj.payload[type][file].variants = 1;
        }

        if (templateObj.previews.length == 0) {
          previewIndexObj.payload[type][file].chunkName = 'js/main';
        }

        // load element config file
        try {
          config = require(path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${tmplPath}/meta/config.json`));
        } catch (e) {
          if (e instanceof Error && e.code === "MODULE_NOT_FOUND") {
            console.error("no config for " + path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${tmplPath}/meta/config.json`));
          } else {
            throw e;
          }
        }

        previewIndexObj.payload[type][file].config = config;

        if(type!='pages') {
          writeTemplateDependencies(file, type);
        }


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

        // filter commits from last days
        simpleGit.log({ 'file': `./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/${file}.${global.template.extIn}` }, (err, log) => {
          let obj = {};
          let filteredCommits = filterCommitsInDateRange(startDate, endDate, log.all);

          log.all = filteredCommits;

          // get object to extend if exist
          try {
            obj = JSON.parse(fs.readFileSync('./log/activity-visualizer.json', 'utf8'));
          } catch (err) {}

          obj[file] = log;

          if (!fs.existsSync('./log')){
            fs.mkdirSync('./log');
          }

          writeFile('./log/activity-visualizer.json', JSON.stringify(obj));
        });
      }

    }

  });
});

// add default main and preview entry
webpackEntryObj['js/main'] = webpackEntryDefault;

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
