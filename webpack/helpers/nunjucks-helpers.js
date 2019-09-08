/* eslint-disable */
const fs = require('fs-extra');
const nunjucks = require('nunjucks');
const merge = require('lodash.merge');

const { parseFile } = require('../libs/nunjucks-parser');
const { writeFile } = require('./file-helpers');


const writeTemplateDependencies = async (file, type, previews) => {
  let env = nunjucks.configure(`./${global.inputDirs.src}/${global.inputDirs.templates}`);
  let { dependencies } = await parseFile(env, `${type}/${file}/${file}.${global.template.extIn}`);
  let allDependencies = dependencies;

  // get preview dependencies
  for(let i = 0; i < previews.length; i++) {
    let path = `${type}/${file}/${previews[i]}.${global.template.extIn}`;
    path = path.replace(/ /g,'');
    let { dependencies } = await parseFile(env, `${type}/${file}/${previews[i]}.${global.template.extIn}`);
    merge(allDependencies, dependencies);
  }

  let selfIndex = 0;

  allDependencies.forEach((dependency, i) => {
    for (let key in dependency) {
      if (dependency.hasOwnProperty(key)) {
        if (dependency[key] != null) {

          if (key != 'path') {
            // remove system path
            if (dependency[key].includes(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)) {
              dependency[key] = dependency[key].split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
            }
            // remove filename
            dependency[key] = dependency[key].substring(0, dependency[key].lastIndexOf("/"));
          }
        }
      }
    }

    // remove own dep
    if (allDependencies['name'] == `${type}/${file}`) {
      selfIndex = i;
    }
  });

  allDependencies.splice(selfIndex, 1);

  // remove layouts
  allDependencies = allDependencies.filter(dependency => !dependency.name.includes('layouts/'));

  if (!fs.existsSync(`./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/log`)){
    fs.mkdirSync(`./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/log`);
  }

  let obj = {
    dependencies: allDependencies
  }

  writeFile(`./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/log/dependencies.json`, JSON.stringify(obj));
};

module.exports = {
  writeTemplateDependencies: writeTemplateDependencies
};
