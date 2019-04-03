/* eslint-disable */

const path = require('path');
const basePath = process.cwd();

const merge = require('webpack-merge');
const webpackConfig = require('../webpack.config');
const WebpackMessages = require('webpack-messages');

const { prev: cleaner } = require('./settings/assets-cleaner');
const { prev: sass } = require('./settings/style-sass');
const { prev: fonts } = require('./settings/assets-fonts');
const { dev: js } = require('./settings/javascript');
const { dev: vue } = require('./settings/javascript-vue');
const { prev: sprites } = require('./settings/assets-sprites');


const settings = {
  entry: ["./preview/app.js"],
  output: {
    devtoolLineToLine: false,
    path: path.resolve(basePath, 'dist/preview'),
    pathinfo: false,
    filename: 'preview.js',
    publicPath: '/'
  },
  devtool: 'cheap-module-eval-source-map',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg', 'node_modules'],
  },
  plugins: [
    new WebpackMessages({
      name: 'darvin client',
      logger: str => console.log(`DV#> ${str}`),
      onComplete: ()=> {
        console.log(`%c
          V
        (o o)
       (  V  )
  .......m.m........
    PREVIEW  DONE`, "font-family:monospace")
      }
    })
  ]
};

module.exports = merge(webpackConfig, settings, cleaner, js, sass, fonts, vue, sprites);
