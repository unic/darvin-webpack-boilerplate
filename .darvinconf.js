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
global.serverBase = (process.env.NODE_ENV === 'dev') ? '/' : '/dist/';
global.serverAssets = 'assets';
global.renderPath = {
  'index': 'index',
  'assets': 'assets'
}
