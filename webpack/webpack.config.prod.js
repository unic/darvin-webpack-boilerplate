/* eslint-disable */
require('./helpers/node-check');
require(`../config/.${process.env.DARVIN_CONF}.js`);

const path = require('path');
const basePath = process.cwd();
const { merge } = require('webpack-merge');

const webpackConfig = require('../webpack.config');
const { getDarvinRC, createDynamicRequireArray } = require('./helpers/config-helpers');

process.env.DARVIN_ENV = 'darvinrc.modern';

let serverBase;
let darvinRcString = getDarvinRC();
let dynamicRequireArr = createDynamicRequireArray(darvinRcString);

for (var i = 0; i < dynamicRequireArr.length; i++) {
  eval(dynamicRequireArr[i]);
}

if(global.server.base==='') {
  serverBase = '/';
} else {
  serverBase = global.server.base;
}

const settings = {
  output: {
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    sourceMapFilename: global.server.assets + '/scripts/maps/[name].js.map',
    filename: global.server.assets + '/[name].[fullhash].js',
    chunkFilename: global.server.assets + '/scripts/async/[name].[contenthash].chunk.js',
    publicPath: serverBase,
  },
  stats: 'errors-only',
  resolve: {
    mainFields: ['browser', 'module', 'main'],
    modules: [
      'node_modules'
    ],
    alias: {
      '@root': basePath,
      '@src': path.resolve(basePath, 'src/'),
      '@scripts': path.resolve(basePath, 'src/scripts/'),
      '@css': path.resolve(basePath, 'src/styles/'),
      '@html': path.resolve(basePath, 'src/templates/'),
      '@webpack': path.resolve(basePath, 'webpack/'),
      process: 'process/browser',
      stream: 'stream-browserify',
      zlib: 'browserify-zlib',
      modernizr$: path.resolve(basePath, '/.modernizrrc.js')
    },
    fallback: {
      'fs': false,
      'tls': false,
      'net': false,
      'zlib': false,
      'http': false,
      'https': false,
      'stream': false,
      'crypto': false
     }
  }
};

settings.entry = {};
settings.entry['scripts/main'] = [`./src/scripts/main.js`];

module.exports = eval('merge(' + darvinRcString + ')');
