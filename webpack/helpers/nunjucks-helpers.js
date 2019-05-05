/* eslint-disable */
const fs = require('fs-extra');
const nunjucks = require('nunjucks');

const { parseFile } = require('../libs/nunjucks-parser');
const { writeFile } = require('./file-helpers');

const writeTemplateDependencies = async (file, type) => {
  let env = nunjucks.configure(`./${global.inputDirs.src}/${global.inputDirs.templates}`);
  let { dependencies } = await parseFile(env, `${type}/${file}/${file}.${global.template.extIn}`);

  let selfIndex = 0;
  let obj = {
    dependencies: dependencies
  }

  dependencies.forEach((dependency, i) => {
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
    if (dependency['name'] == `${type}/${file}`) {
      selfIndex = i;
    }
  });

  dependencies.splice(selfIndex, 1);

  // remove layouts
  dependencies = dependencies.filter(dependency => !dependency.name.includes('layouts/'));

  if (!fs.existsSync(`./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/log`)){
    fs.mkdirSync(`./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/log`);
  }

  writeFile(`./${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/log/dependencies.json`, JSON.stringify(obj));
};

module.exports = {
  writeTemplateDependencies: writeTemplateDependencies
};
