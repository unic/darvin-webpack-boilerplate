global.mainChunk = 'js/main';
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
  'base': (process.env.NODE_ENV === 'dev') ? '/' : '/dist/',
  'assets': 'assets'
}
