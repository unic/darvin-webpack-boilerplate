global.project = 'Darvin';
global.mainChunk = 'js/main';
global.proxy = 'unic.local';
global.port = 7001;
global.template = {
  'extIn': 'njk',
  'extOut': 'html'
}
global.preview = {
  indexName: 'index',
  indexFileInput: 'index.njk',
  indexFileOutput: 'index.html'
}
global.inputDirs = {
  src: 'src',
  assets: 'assets',
  templates: 'templates',
  js: 'js'
}
global.output = {
  'index': 'index'
}
global.server = {
  'base': (process.env.NODE_ENV === 'dev') ? '/cms/frontend/main/resources/' : '/cms/frontend/main/resources/',
  'assets': 'assets'
}