const webpack = require('webpack');

const path = require('path');
const ROOT_PATH = process.cwd();

const CACHE_PATH = path.join(ROOT_PATH, 'tmp/cache');

const SVELTE_VERSION = require('svelte/package.json').version;
const SVELTE_LOADER_VERSION = require('svelte-loader/package.json').version;

const prod = {
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              hotReload: true,
              emitCss: true,
              cacheDirectory: path.join(CACHE_PATH, 'svelte-loader'),
              cacheIdentifier: [
                process.env.NODE_ENV || 'development',
                webpack.version,
                SVELTE_VERSION,
                SVELTE_LOADER_VERSION,
              ].join('|')
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          {
            loader: 'svelte-loader',
            options: {
              hotReload: true,
              emitCss: true,
              cacheDirectory: path.join(CACHE_PATH, 'svelte-loader'),
              cacheIdentifier: [
                process.env.NODE_ENV || 'development',
                webpack.version,
                SVELTE_VERSION,
                SVELTE_LOADER_VERSION,
              ].join('|')
            },
          },
        ],
      }
    ]
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte')
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main']
  },
};

module.exports = {
  prod: prod,
  dev: dev
};
