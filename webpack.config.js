const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const ROOT_PATH = require('path');
const smp = new SpeedMeasurePlugin();

const webpackConfigDev = smp.wrap({
  resolve: {
    modules: ['node_modules']
  },
  resolveLoader: {
    modules: [ROOT_PATH.resolve(__dirname, 'webpack/packages'), 'node_modules']
  }
});

const webpackConfigProd ={
  resolve: {
    modules: ['node_modules']
  },
  resolveLoader: {
    modules: [ROOT_PATH.resolve(__dirname, 'webpack/packages'), 'node_modules']
  }
};

module.exports = process.env.NODE_ENV === 'dev' ? webpackConfigDev : webpackConfigProd;
