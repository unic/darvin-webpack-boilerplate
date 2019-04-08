/* eslint-disable */
const isDev = (process.env.NODE_ENV === 'dev');

const darvinGlobals = () => {
  global.templateExt = 'njk';
  global.templateExtTarget = 'html';
  global.dirRoot = 'src';
  global.dirAsset = 'assets';
  global.dirTemplate = 'templates';
  global.dirJs = 'js';
  global.mainChunk = 'js/main';
  global.prevIndexName = 'index';
  global.prevIndexFile = 'index.njk';
  global.prevIndexFileTarget = 'index.html';
  global.serverBase = isDev ? '/' : '/';
};

module.exports = {
  darvinGlobals: darvinGlobals
};
