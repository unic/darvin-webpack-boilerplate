/* eslint-disable */
require('./helpers/node-check');
require('../.darvinconf.js');

const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');
const { getDarvinRC, createDynamicRequireArray } = require('./helpers/config-helpers');

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
    devtoolLineToLine: false,
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: global.server.assets + '/[name].js',
    chunkFilename: global.server.assets + '/async/[name].[contenthash].js',
    publicPath: serverBase
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    alias: {
      '@root': basePath,
      '@src': path.resolve(basePath, 'src/'),
      '@js': path.resolve(basePath, 'src/js/'),
      '@css': path.resolve(basePath, 'src/styles/'),
      '@html': path.resolve(basePath, 'src/templates/'),
      '@webpack': path.resolve(basePath, 'webpack/'),
    }
  },
  stats: 'errors-only'
};

settings.entry = {};
settings.entry[global.mainChunk] = [`./src/${global.mainChunk}.js`];

module.exports = eval('merge(' + darvinRcString + ')');
