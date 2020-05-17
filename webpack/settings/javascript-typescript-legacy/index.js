const babelConfig = require('../javascript/babel-config.js');

const prod = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules|/,
          /webpack\/packages/
        ],
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            options: babelConfig.legacy
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              compilerOptions: {
                target: 'es5'
              }
            }
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(vue|svelte|jsx).(ts|tsx)$/,
        exclude: [
          /node_modules|/,
          /webpack\/packages/
        ],
        enforce: 'pre',
        use: [
          {
            loader: 'vue-tslint-loader',
          }
        ]
      },
      {
        test: /\.ts$/,
        exclude: [
          /\.(vue|svelte|jsx).(ts|tsx)$/,
          /node_modules/,
          /webpack\/packages/
        ],
        enforce: 'pre',
        use: [
          {
            loader: 'tslint-loader',
            options: {
              fix: true,
            }
          }
        ]
      },
      {
        test: /\.tsx?$/,
        exclude: [
          /node_modules|/,
          /webpack\/packages/
        ],
        use: [
          {
            loader: 'babel-loader?cacheDirectory',
            options: babelConfig.legacy
          },
          {
            loader: 'ts-loader',
            options: {
              appendTsSuffixTo: [/\.vue$/],
              compilerOptions: {
                target: 'es5'
              }
            }
          },
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
};

module.exports = {
  prod: prod,
  dev: dev
};
