/* eslint-disable */
require('./helpers/node-check');
require(`../config/.${process.env.DARVIN_CONF}.js`);

const path = require('path');
const basePath = process.cwd();

const { merge } = require('webpack-merge');
const webpackConfig = require('../webpack.config');

const { prev: cleaner } = require('./settings/assets-cleaner');
const { prev: sass } = require('./settings/style-sass');
const { prev: fonts } = require('./settings/assets-fonts');
const { dev: js } = require('./settings/javascript');
const { prev: sprites } = require('./settings/assets-sprites');
const { prod: modernizr } = require('./settings/javascript-modernizr');

const settings = {
    entry: ["./preview/app.js"],
    output: {
        path: path.resolve(basePath, 'dist/preview'),
        pathinfo: false,
        filename: 'preview.js',
        chunkFilename: '[name].[contenthash].js',
        publicPath: '/preview/'
    },
    devtool: 'eval',
    stats: 'minimal',
    resolve: {
        mainFields: ['browser', 'module', 'main'],
        modules: [
            'node_modules'
        ],
        alias: {
            '@root': basePath,
            '@preview': path.resolve(basePath, 'preview/'),
            '@scripts': path.resolve(basePath, 'preview/scripts/'),
            '@css': path.resolve(basePath, 'preview/styles/'),
            '@html': path.resolve(basePath, 'preview/templates/'),
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

module.exports = merge(webpackConfig, settings, cleaner, js, sass, fonts, modernizr, sprites);
