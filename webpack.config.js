const path = require('path');
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin');

const smp = new SpeedMeasurePlugin();

const webpackConfig = smp.wrap({
  resolve: {
    modules: [
      path.join(__dirname, 'node_modules'),
    ]
  }
});

module.exports = webpackConfig;
