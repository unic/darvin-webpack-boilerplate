require('./helpers/node-check');
require(`../config/.${process.env.DARVIN_CONF}.js`);

const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');

const webpackConfig = require('../webpack.config');
const {getDarvinRC, createDynamicRequireArray} = require('./helpers/config-helpers');

let serverBase;
let darvinRcString = getDarvinRC();
let dynamicRequireArr = createDynamicRequireArray(darvinRcString);

for (var i = 0; i < dynamicRequireArr.length; i++) {
  eval(dynamicRequireArr[i]);
}

if (global.server.base === '') {
  serverBase = '/';
} else {
  serverBase = global.server.base;
}

const settings = {
  output: {
    devtoolLineToLine: false,
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: global.server.assets + '/[name].[hash].js',
    chunkFilename: global.server.assets + '/scripts/async/[name].[contenthash].js',
    publicPath: serverBase,
    jsonpFunction: 'cssJsonp'
  },
  devtool: 'cheap-module-eval-source-map',
  stats: 'minimal',
  resolve: {
    alias: {
      '@root': basePath,
      '@src': path.resolve(basePath, 'src/'),
      '@scripts': path.resolve(basePath, 'src/scripts/'),
      '@css': path.resolve(basePath, 'src/styles/'),
      '@html': path.resolve(basePath, 'src/templates/'),
      '@webpack': path.resolve(basePath, 'webpack/'),
    }
  },
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  watchOptions: {
    ignored: [
      '**/*.woff',
      '**/*.json',
      '**/*.woff2',
      '**/*.jpg',
      '**/*.png',
      '**/*.svg',
      'node_modules/**',
      '.cli/**',
      'tmp/**',
      'webpack/**',
      'preview/**',
      'dist/**',
      'log/**',
      'api/**',
      'config/**',
      '*/\.*'
    ],
  }
};

settings.entry = {};

if (process.env.SCRIPT_ENV === 'legacy') {
  settings.entry['scripts/main'] = [`./src/scripts/main.legacy.js`];
} else {
  settings.entry['scripts/main'] = [`./src/scripts/main.js`];
}

module.exports = eval('merge(' + darvinRcString + ')');
