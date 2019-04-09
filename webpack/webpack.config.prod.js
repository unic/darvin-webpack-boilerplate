/* eslint-disable */

const path = require('path');
const basePath = process.cwd();

const merge = require('webpack-merge');
const WebpackMessages = require('webpack-messages');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

// init globals
const { darvinGlobals } = require('../.darvinconf.js');
darvinGlobals();

const webpackConfig = require('../webpack.config');
const { printFancy } = require('./helpers/darvin-helpers');
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
    devtoolLineToLine: true,
    sourceMapFilename: global.serverAssets + '/[name].js.map',
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: global.serverAssets + '/[name].js',
    chunkFilename: 'async/[name].chunk.js',
    publicPath: global.baseBath
  },
  devtool: 'source-map',
  plugins: [
    /*new WebpackShellPlugin({
      onBuildStart:{
        scripts: ['echo \> START COMPILING'],
        blocking: true,
        parallel: false
      },
      onBuildEnd:{
        scripts: ['echo \> COMPILING END'],
        blocking: true,
        parallel: false
      }
    }),*/
    new WebpackMessages({
      name: 'Production',
      logger: str => console.log(`DV#> ${str}`),
      onComplete: printFancy
    })
  ]
};

module.exports = eval('merge(' + darvinRcString + ')');
