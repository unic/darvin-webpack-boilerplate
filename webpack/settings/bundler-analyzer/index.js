const {BundleAnalyzerPlugin} = require('webpack-bundle-analyzer');

const prod = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false
    }),
  ],
};

const dev = {};

module.exports = {
  prod: prod,
  dev: dev
};

