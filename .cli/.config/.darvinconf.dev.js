global.project = '@@@name@@@';
global.mainChunk = '@@@entry@@@';
global.proxy = '@@@proxy@@@';
global.port = '@@@port@@@';
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
  scripts: 'scripts'
}
global.output = {
  'index': 'index'
}
global.server = {
  'base': '@@@routerDev@@@',
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
