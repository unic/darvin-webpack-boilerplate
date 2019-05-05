global.project = 'Unic Drupal Starterkit';
global.mainChunk = 'js/main';
global.template = {
  'extIn': 'twig',
  'extOut': 'html'
}
global.preview = {
  indexName: 'index',
  indexFileInput: 'index.twig',
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
  'base': (process.env.NODE_ENV === 'dev') ? '/themes/unic/dist' : '/themes/unic/dist',
  'assets': 'assets'
}
