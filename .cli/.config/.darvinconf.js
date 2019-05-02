global.project = '@@@name@@@';
global.mainChunk = '@@@entry@@@';
global.template = {
  'extIn': '@@@extIn@@@',
  'extOut': 'html'
}
global.preview = {
  indexName: 'index',
  indexFileInput: 'index.@@@extIn@@@',
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
  'base': (process.env.NODE_ENV === 'dev') ? '' : '@@@router@@@',
  'assets': 'assets'
}
