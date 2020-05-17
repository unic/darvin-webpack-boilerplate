const path = require('path');

const webpackConfig = {
  resolve: {
    modules: ['node_modules']
  },
  resolveLoader: {
    modules: [path.resolve(__dirname, 'webpack/packages'), 'node_modules']
  }
};

module.exports = webpackConfig;
