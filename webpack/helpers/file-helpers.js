/* eslint-disable */
const path = require('path');
const fs = require('fs-extra');

const getDirs = (p) => {
  let dirs = [];
  try {
    dirs = fs.readdirSync(p);
  } catch (err) {

  }
  return dirs.filter(f => fs.statSync(path.join(p, f)).isDirectory());
},
deleteDir = (file) => {
  try {
    fs.removeSync(file);
    return true;
  } catch (err) {
    console.log('error in delete dir');
    console.error(err);
    return false;
  }
},
readFile = (file) => {
  let rawdata;
  try {
    rawdata = fs.readFileSync(file);
  } catch (err) {
    console.log('error in readFile');
    console.error(err);
    return {};
  }
  return JSON.parse(rawdata);
},
writeFile = (filePath, payload) => {
  try {
    fs.writeFileSync(filePath, payload, 'utf8', () => {});
    return true;
  } catch (err) {
    console.log('error in writeFile');
    console.error(err);
    return false;
  }
},
fileExist = (file) => {
  try {
    if (fs.existsSync(file)) {
      return true;
    }
  } catch(err) {
    return false;
  }
},
deleteFile = (file) => {
  try {
    fs.removeSync(file);
    return true;
  } catch (err) {
    console.log('error in deleteFile');
    console.error(err);
    return false;
  }
},
fsCopy = (from, to, msg) => {
  fs.copy(from, to, {overwrite: true}, function (err) {
    if (err) {
      console.log('error in fsCopy');
      console.error(err);
    }
  });
};

module.exports = {
  getDirs: getDirs,
  fsCopy: fsCopy,
  readFile: readFile,
  writeFile: writeFile,
  deleteFile: deleteFile,
  deleteDir: deleteDir,
  fileExist: fileExist
};
