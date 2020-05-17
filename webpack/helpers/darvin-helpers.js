/* eslint-disable */
const path = require('path');
const glob = require('glob');
const fs = require('fs-extra');
const basePath = process.cwd();

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
cmpStringsWithNumbers = (a, b) => {
  // Regular expression to separate the digit string from the non-digit strings.
  let reParts = /\d+|\D+/g;

  // Regular expression to test if the string has a digit.
  let reDigit = /\d/;

  // Get rid of casing issues.
  a = a.toUpperCase();
  b = b.toUpperCase();

  // Separates the strings into substrings that have only digits and those
  // that have no digits.
  var aParts = a.match(reParts);
  var bParts = b.match(reParts);

  // Used to determine if aPart and bPart are digits.
  var isDigitPart;

  // If `a` and `b` are strings with substring parts that match...
  if(aParts && bParts &&
      (isDigitPart = reDigit.test(aParts[0])) == reDigit.test(bParts[0])) {
    // Loop through each substring part to compare the overall strings.
    var len = Math.min(aParts.length, bParts.length);
    for(var i = 0; i < len; i++) {
      var aPart = aParts[i];
      var bPart = bParts[i];

      // If comparing digits, convert them to numbers (assuming base 10).
      if(isDigitPart) {
        aPart = parseInt(aPart, 10);
        bPart = parseInt(bPart, 10);
      }

      // If the substrings aren't equal, return either -1 or 1.
      if(aPart != bPart) {
        return aPart < bPart ? -1 : 1;
      }

      // Toggle the value of isDigitPart since the parts will alternate.
      isDigitPart = !isDigitPart;
    }
  }

  // Use normal comparison.
  return (a >= b) - (a <= b);
},
getTemplateFiles = (type, file) => {
  let templatePath = `${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/${file}.${global.template.extIn}`;

  if (!fs.existsSync(path.resolve(basePath, `${templatePath}`))) {
    return [];
  }

  // get previews
  const tmplPreviews = glob.sync(`*.preview*.${global.template.extIn}`, {
    cwd: path.join(basePath, `${global.inputDirs.src}/${global.inputDirs.templates}/${type}/${file}/`),
    realpath: false
  }).map(page => {
    return page.replace(`.${global.template.extIn}`, '');
  });

  return {
    template: templatePath,
    previews: tmplPreviews.sort(cmpStringsWithNumbers)
  }
},
getSVGIcons = () => {
  // get previews
  const icons = glob.sync('*.svg', {
    cwd: path.join(basePath, `${global.inputDirs.src}/${global.inputDirs.assets}/images/icons/`),
    realpath: false
  }).map(page => {
    return page.replace('.svg', '');
  });

  return {
    icons: icons
  }
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
capitalize = (s) => typeof s !== 'string' ? '' : s.charAt(0).toUpperCase() + s.slice(1);


module.exports = {
  filterCommitsInDateRange: filterCommitsInDateRange,
  getTemplateFiles: getTemplateFiles,
  sortByKey: sortByKey,
  getSVGIcons: getSVGIcons,
  capitalize: capitalize
};
