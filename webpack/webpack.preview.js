/* eslint-disable */
require('./helpers/node-check');
require(`../config/.${process.env.DARVIN_CONF}.js`);

const path = require('path');
const basePath = process.cwd();

const merge = require('webpack-merge');
const webpackConfig = require('../webpack.config');

const { prev: cleaner } = require('./settings/assets-cleaner');
const { prev: sass } = require('./settings/style-sass');
const { prev: fonts } = require('./settings/assets-fonts');
const { dev: js } = require('./settings/javascript-legacy');
const { prev: sprites } = require('./settings/assets-sprites');
const { prod: modernizr } = require('./settings/javascript-modernizr');

const settings = {
  entry: ["./preview/app.js"],
  output: {
    devtoolLineToLine: false,
    path: path.resolve(basePath, 'dist/preview'),
    pathinfo: false,
    filename: 'preview.js',
    chunkFilename: '[name].[contenthash].js',
    publicPath: '/preview/'
  },
  stats: 'errors-only',
  devtool: 'eval',
  watchOptions: {
    aggregateTimeout: 300,
    ignored: ['**/*.woff', '**/*.woff2', '**/*.jpg', '**/*.png', '**/*.svg', 'node_modules'],
  },
  plugins: [],
  resolve: {
    alias: {
      '@root': basePath,
      '@preview': path.resolve(basePath, 'preview/'),
      '@scripts': path.resolve(basePath, 'preview/scripts/'),
      '@css': path.resolve(basePath, 'preview/styles/'),
      '@html': path.resolve(basePath, 'preview/templates/')
    }
  }
};

module.exports = merge(webpackConfig, settings, cleaner, js, sass, fonts, modernizr, sprites);
