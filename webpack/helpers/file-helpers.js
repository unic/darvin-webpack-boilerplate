/* eslint-disable */
const path = require('path');
const fs = require('fs-extra');

const getDirs = p => fs.readdirSync(p).filter(f => fs.statSync(path.join(p, f)).isDirectory()),
readFile = (file) => {
  try {
    let rawdata = fs.readFileSync(file);
    return JSON.parse(rawdata);
  } catch (err) {
    console.error(err);
    return {};
  }
},
writeFile = (filePath, payload) => {
  try {
    fs.writeFileSync(filePath, payload, 'utf8', () => {});
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
},
deleteFile = (file) => {
  try {
    fs.removeSync(file);
    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
},
copyDir = (from, to, msg) => {
  fs.copy(from, to, {overwrite: true}, function (err) {
    if (err) {
      console.log('error in copyDir');
      console.error(err);
    }
  });
};

module.exports = {
  getDirs: getDirs,
  copyDir: copyDir,
  readFile: readFile,
  writeFile: writeFile,
  deleteFile: deleteFile
};
