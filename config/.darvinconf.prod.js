global.project = 'Darvin Webpack Boilerplate';
global.mainChunk = 'scripts/main';
global.proxy = '';
global.port = '8001';
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
  scripts: 'scripts'
}
global.output = {
  'index': 'index'
}
global.server = {
  'base': '/dist',
  'assets': 'assets'
}
global.breakpoints = [
  {
    "name": "zero",
    "value": 0,
    "gap": 16,
    "cols": 4
  },{
    "name": "micro",
    "value": 360,
    "gap": 16,
    "cols": 4
  },{
    "name": "small",
    "value": 600,
    "gap": 16,
    "cols": 4
  },{
    "name": "medium",
    "value": 840,
    "gap": 16,
    "cols": 8
  },{
    "name": "large",
    "value": 1024,
    "gap": 24,
    "cols": 8
  },{
    "name": "wide",
    "value": 1280,
    "gap": 24,
    "cols": 12
  },{
    "name": "ultra",
    "value": 1440,
    "gap": 24,
    "cols": 12
  }
];
