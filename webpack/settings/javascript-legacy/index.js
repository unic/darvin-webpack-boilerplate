const babelConfig = require('../javascript/babel-config.js');

const prod = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /webpack\/packages/
        ],
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /webpack\/packages/
        ],
        loader: "babel-loader",
        options: babelConfig.legacy
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
  }
};

const dev = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /webpack\/packages/
        ],
        use: {
          loader: 'eslint-loader',
        }
      },
      {
        test: /\.js$/,
        exclude: [
          /node_modules/,
          /webpack\/packages/
        ],
        loader: "babel-loader",
        options: babelConfig.legacy
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
  }
};

module.exports = {
  prod: prod,
  dev: dev
};

