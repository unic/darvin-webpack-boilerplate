/* eslint-disable */

const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');

// init globals
const { darvinGlobals } = require('../.darvinconf.js');
darvinGlobals();

const webpackConfig = require('../webpack.config');
const { getDarvinRC, createDynamicRequireArray } = require('./helpers/config-helpers');

let darvinRcString = getDarvinRC();
let dynamicRequireArr = createDynamicRequireArray(darvinRcString);

for (var i = 0; i < dynamicRequireArr.length; i++) {
  eval(dynamicRequireArr[i]);
}

const settings = {
  entry: {
    "js/main": ["./src/js/main.js"]
  },
  output: {
    devtoolLineToLine: false,
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: global.serverAssets + '/[name].js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map'
};

module.exports = eval('merge(' + darvinRcString + ')');
