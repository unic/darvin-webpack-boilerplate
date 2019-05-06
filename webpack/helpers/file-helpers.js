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
    process.exit();
    return {};
  }
},
writeFile = (filePath, payload) => {
  try {
    fs.writeFileSync(filePath, payload, 'utf8', () => {});
    return true;
  } catch (err) {
    console.error(err);
    process.exit();
    return false;
  }
},
deleteFile = (file) => {
  fs.unlink(file, function (err) {
    if (err) throw err;
  });
},
copyDir = (from, to, msg) => {
  fs.copy(from, to, {overwrite: true}, function (err) {
    if (err) {
      console.error(err);
      process.exit();
    } else {
      console.log(`DV#> ${msg}`);
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
