/* eslint-disable */

const darvinGlobals = () => {
  global.templateExt = 'njk';
  global.dirRoot = 'src';
  global.dirAsset = 'assets';
  global.dirTemplate = 'templates';
  global.dirJs = 'js';
  global.prevIndexFile = 'index.njk';
  global.prevIndexFileTarget = 'index.html';
};

module.exports = {
  darvinGlobals: darvinGlobals
};
