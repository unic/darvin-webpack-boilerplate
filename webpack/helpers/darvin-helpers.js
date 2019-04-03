/* eslint-disable */
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const basePath = process.cwd();

const nunjucks = require('nunjucks');
const { parseFile } = require('./../libs/nunjucks-parser');

const { writeFile } = require('./file-helpers');


const filterCommitsInDateRange = (startDate, endDate, commitsArr) => {
  let retArr = [];
  let commitsArrDate = commitsArr.map(item => (new Date(item.date.split(' ')[0])));

  // loop all dates
  for (let i = 0; i < commitsArrDate.length; i++) {
    let date = commitsArrDate[i];

    // if date between startDate and endDate range
    if (startDate <= date && date <= endDate) {
      retArr.push(commitsArr[i]);
    }
  }

  return retArr;
},
prepareDependencies = async (file, type) => {
  let env = nunjucks.configure(`./${global.dirRoot}/${global.dirTemplate}`);
  let { dependencies } = await parseFile(env, `${type}/${file}/${file}.${global.templateExt}`);

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
            if (dependency[key].includes(`/${global.dirRoot}/${global.dirTemplate}/`)) {
              dependency[key] = dependency[key].split(`/${global.dirRoot}/${global.dirTemplate}/`)[1];
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

  if (!fs.existsSync(`./${global.dirRoot}/${global.dirTemplate}/${type}/${file}/log`)){
    fs.mkdirSync(`./${global.dirRoot}/${global.dirTemplate}/${type}/${file}/log`);
  }

  writeFile(`./${global.dirRoot}/${global.dirTemplate}/${type}/${file}/log/dependencies.json`, JSON.stringify(obj));
},
getTemplateFiles = (type, file) => {
  let templatePath = `${global.dirRoot}/${global.dirTemplate}/${type}/${file}/${file}.${global.templateExt}`;
  let tmplPreviews = [];

  if (!fs.existsSync(path.resolve(basePath, `${templatePath}`))) {
    console.error(`> no template file found in ${templatePath}`);
    return [];
  }

  // get previews
  tmplPreviews = glob.sync(`*.preview*.${global.templateExt}`, {
    cwd: path.join(basePath, `${global.dirRoot}/${global.dirTemplate}/${type}/${file}/`),
    realpath: false
  }).map(page => {
    return page.replace(`.${global.templateExt}`, '');
  });

  return {
    template: templatePath,
    previews: tmplPreviews
  }
},
getSVGIcons = () => {
  let icons = [];

  // get previews
  icons = glob.sync('*.svg', {
    cwd: path.join(basePath, `${global.dirRoot}/${global.dirAsset}/images/icons/`),
    realpath: false
  }).map(page => {
    return page.replace('.svg', '');
  });

  return {
    icons: icons
  }
},
printFancy = () => {
  let art=`\n\
   \n\
  It always seems impossible until it's done. ... \n\
   \n\
  _____                         .     .\n\
  '    \\\\                  .                .                      |>>\n\
      O//             .                        .                   |\n\
     \\_\\          .                              .                 |\n\
     | |      .                                   .    .  .        |\n\
    /  |  .                                        . .      .      |\n\
   /  .|                                            .        ...o  |\n\
  ------------------------------- GREAT JOB ------------------------------\n\
  \n\
   \n`;
  console.log(art);
},
sortByKey = (array, key) => {
  return array.sort(function(a, b) {
    let x = a[key];
    let y = b[key];

    if (typeof x == "string")
    {
        x = (""+x).toLowerCase();
    }
    if (typeof y == "string")
    {
        y = (""+y).toLowerCase();
    }

    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
},
capitalize = (s) => {
  if (typeof s !== 'string') return ''
  return s.charAt(0).toUpperCase() + s.slice(1)
};


module.exports = {
  filterCommitsInDateRange: filterCommitsInDateRange,
  prepareDependencies: prepareDependencies,
  getTemplateFiles: getTemplateFiles,
  sortByKey: sortByKey,
  getSVGIcons: getSVGIcons,
  printFancy: printFancy,
  capitalize: capitalize
};
