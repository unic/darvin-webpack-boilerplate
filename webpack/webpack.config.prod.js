/* eslint-disable */
const fs = require('fs');
let nvmRcVersion = fs.readFileSync('./.nvmrc', 'utf8').replace(/[^0-9.]/g, "");
let nodeProcessVersion = process.version.replace(/[^0-9.]/g, "");

if(nodeProcessVersion != nvmRcVersion) {
  console.error(`DV#> make sure node is running under v${nvmRcVersion}`);
  process.exit();
}

// init globals
require('../.darvinconf.js');

const path = require('path');
const basePath = process.cwd();
const merge = require('webpack-merge');
const WebpackMessages = require('webpack-messages');
const WebpackShellPlugin = require('webpack-shell-plugin-next');

const webpackConfig = require('../webpack.config');
const { printFancy } = require('./helpers/darvin-helpers');
const { getDarvinRC, createDynamicRequireArray } = require('./helpers/config-helpers');

let darvinRcString = getDarvinRC();
let dynamicRequireArr = createDynamicRequireArray(darvinRcString);

for (var i = 0; i < dynamicRequireArr.length; i++) {
  eval(dynamicRequireArr[i]);
}

const settings = {
  output: {
    devtoolLineToLine: true,
    sourceMapFilename: global.server.assets + '/js/maps/[name].js.map',
    path: path.resolve(basePath, 'dist'),
    pathinfo: false,
    filename: global.server.assets + '/[name].js',
    chunkFilename: global.server.assets + '/js/async/[name].[contenthash].js',
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
  ],
  resolve: {
    alias: {
      '@root': basePath,
      '@src': path.resolve(basePath, 'src/'),
      '@js': path.resolve(basePath, 'src/js/'),
      '@css': path.resolve(basePath, 'src/styles/'),
      '@html': path.resolve(basePath, 'src/templates/')
    }
  }
};

settings.entry = {};
settings.entry[global.mainChunk] = [`./src/${global.mainChunk}.js`];

module.exports = eval('merge(' + darvinRcString + ')');
