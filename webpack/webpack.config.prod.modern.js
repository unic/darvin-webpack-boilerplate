/* eslint-disable */
require('./helpers/node-check');
require(`../config/.${process.env.DARVIN_CONF}.js`);

const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');
const ExtendedAPIPlugin = require('webpack/lib/ExtendedAPIPlugin');

const webpackConfig = require('../webpack.config');
const { getDarvinRC, createDynamicRequireArray } = require('./helpers/config-helpers');

process.env.DARVIN_ENV = "darvinrc.modern";

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
    sourceMapFilename: global.server.assets + '/scripts/maps/[name].js.map',
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: global.server.assets + '/[name].[hash].js',
    chunkFilename: global.server.assets + '/scripts/async/[name].[contenthash].js',
    publicPath: serverBase,
    jsonpFunction: 'cssJsonp'
  },
  devtool: false,
  stats: 'errors-only',
  plugins: [
    new ExtendedAPIPlugin()
  ],
  resolve: {
    alias: {
      '@root': basePath,
      '@src': path.resolve(basePath, 'src/'),
      '@scripts': path.resolve(basePath, 'src/scripts/'),
      '@css': path.resolve(basePath, 'src/styles/'),
      '@html': path.resolve(basePath, 'src/templates/')
    }
  }
};

settings.entry = {};
settings.entry['scripts/main'] = [`./src/scripts/main.js`];

module.exports = eval('merge(' + darvinRcString + ')');
