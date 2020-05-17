const babelConfig = require('./babel-config');

const { getDarvinRC } = require('../../helpers/config-helpers');
let darvinRcString = getDarvinRC();

const prod = {
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(m?js|jsx)$/,
        exclude: path => /node_modules|packages|vendor[\\/]assets/.test(path) && !/\.vue\.jsx\.svelte\.js/.test(path),
        use: {
          loader: 'eslint-loader',
          options: {
            // eslint options (if necessary)
          }
        },
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: path => /node_modules|packages|vendor[\\/]assets/.test(path) && !/\.vue\.jsx\.svelte\.js/.test(path),
        include: darvinRcString.includes('svelte') ? [/svelte/] : [],
        loader: "babel-loader",
        options: darvinRcString.includes('react') ? babelConfig.modernReact : babelConfig.modern
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
        test: /\.(m?js|jsx)$/,
        exclude: path => /node_modules|packages|vendor[\\/]assets/.test(path) && !/\.vue\.jsx\.svelte\.js/.test(path),
        use: {
          loader: 'eslint-loader',
        }
      },
      {
        test: /\.(m?js|jsx)$/,
        exclude: path => /node_modules|packages|vendor[\\/]assets/.test(path) && !/\.vue\.jsx\.svelte\.js/.test(path),
        use: {
          loader: 'babel-loader?cacheDirectory',
          options: darvinRcString.includes('react') ? babelConfig.modernReact : babelConfig.modern
        }
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
  }
};

// include svelte
if(darvinRcString.includes('svelte')) {
  dev.module.rules[1]['include'] = [/svelte/];
}

module.exports = {
  prod: prod,
  dev: dev
};

