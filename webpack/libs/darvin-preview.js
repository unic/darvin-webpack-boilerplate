/* eslint-disable */
const path = require('path');
const basePath = process.cwd();

const fs = require('fs-extra');
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
            // console.error("no config for " + path.resolve(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${tmplPath}/meta/config.json`));
          } else {
            throw e;
          }
        }

        previewIndexObj.payload[type][file].config = config;

        if(type!='pages') {
          writeTemplateDependencies(file, type, templateObj.previews);
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

          if(err) {
            if (!fs.existsSync('./log')){
              fs.mkdirSync('./log');
            }

            // write stub
            writeFile('./log/activity-visualizer.json', JSON.stringify({"c00-svg_icon":{"all":[{"hash":"b185951b17f2d8db24809264c29bf4abc0e323d7","date":"2019-04-12 00:11:39 +0200","message":"replace icon copy string and adjust icon paths","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"86fb7097a792aff79fbed09358efeaed5cb4dec9","date":"2019-04-10 11:04:02 +0200","message":"rebase darvinconfig","refs":" Closes #7","body":"HEAD","author_name":"","author_email":"Tobias Frei"},{"hash":"4269d0ee12eda3dc3946871398d9ed398fd32fcf","date":"2019-04-08 21:09:41 +0200","message":"add path config","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"9c23bd40684b066dcde8fe08972bb689963a102a","date":"2019-04-08 18:50:15 +0200","message":"add serverBase in config","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"ed19be5c28800e221deb734dc6429248b3d251fc","date":"2019-04-03 18:11:27 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"28b12403a3bfdf50f78c0d8779109c7b7661bd19","date":"2019-04-03 00:28:27 +0200","message":"avoid empty array config in rc string","refs":" Closes #1","body":"origin/bugfix/issue#1-darvin-cli_frameworks","author_name":"","author_email":"tobias.frei"},{"hash":"2da1e636107201628850a92f7a683cd0dc0db4d4","date":"2019-04-01 16:32:14 +0200","message":"rebase darvin on v0.0.8 from github.com/tobiasfrei","refs":"","body":"","author_name":"Tobias Frei","author_email":"tobias.frei@unic.com"}],"latest":{"hash":"b185951b17f2d8db24809264c29bf4abc0e323d7","date":"2019-04-12 00:11:39 +0200","message":"replace icon copy string and adjust icon paths","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},"total":8},"c02-grid":{"all":[{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"ed19be5c28800e221deb734dc6429248b3d251fc","date":"2019-04-03 18:11:27 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"28b12403a3bfdf50f78c0d8779109c7b7661bd19","date":"2019-04-03 00:28:27 +0200","message":"avoid empty array config in rc string","refs":" Closes #1","body":"origin/bugfix/issue#1-darvin-cli_frameworks","author_name":"","author_email":"tobias.frei"},{"hash":"2da1e636107201628850a92f7a683cd0dc0db4d4","date":"2019-04-01 16:32:14 +0200","message":"rebase darvin on v0.0.8 from github.com/tobiasfrei","refs":"","body":"","author_name":"Tobias Frei","author_email":"tobias.frei@unic.com"}],"latest":{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},"total":4},"m01-accordion":{"all":[{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"ed19be5c28800e221deb734dc6429248b3d251fc","date":"2019-04-03 18:11:27 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"28b12403a3bfdf50f78c0d8779109c7b7661bd19","date":"2019-04-03 00:28:27 +0200","message":"avoid empty array config in rc string","refs":" Closes #1","body":"origin/bugfix/issue#1-darvin-cli_frameworks","author_name":"","author_email":"tobias.frei"},{"hash":"2da1e636107201628850a92f7a683cd0dc0db4d4","date":"2019-04-01 16:32:14 +0200","message":"rebase darvin on v0.0.8 from github.com/tobiasfrei","refs":"","body":"","author_name":"Tobias Frei","author_email":"tobias.frei@unic.com"}],"latest":{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},"total":4},"p01-accordion":{"all":[{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"ed19be5c28800e221deb734dc6429248b3d251fc","date":"2019-04-03 18:11:27 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},{"hash":"28b12403a3bfdf50f78c0d8779109c7b7661bd19","date":"2019-04-03 00:28:27 +0200","message":"avoid empty array config in rc string","refs":" Closes #1","body":"origin/bugfix/issue#1-darvin-cli_frameworks","author_name":"","author_email":"tobias.frei"},{"hash":"2da1e636107201628850a92f7a683cd0dc0db4d4","date":"2019-04-01 16:32:14 +0200","message":"rebase darvin on v0.0.8 from github.com/tobiasfrei","refs":"","body":"","author_name":"Tobias Frei","author_email":"tobias.frei@unic.com"}],"latest":{"hash":"a61103fef9729e4f2347bc027ccdb359b692921e","date":"2019-04-03 18:12:09 +0200","message":"fix line endings","refs":"","body":"","author_name":"tobias.frei","author_email":"mail@tobiasfrei.ch"},"total":4},"p02-demo":{"all":[{"hash":"cf9ebf33943b4b9bdd93c60e44e578f57daa5ceb","date":"2019-04-09 16:06:41 +0200","message":"Add the basis of new js architecture","refs":"","body":"","author_name":"Christian Sany","author_email":"christian.sany@bluewin.ch"}],"latest":{"hash":"cf9ebf33943b4b9bdd93c60e44e578f57daa5ceb","date":"2019-04-09 16:06:41 +0200","message":"Add the basis of new js architecture","refs":"","body":"","author_name":"Christian Sany","author_email":"christian.sany@bluewin.ch"},"total":1}}));
          } else {
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
          }
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
