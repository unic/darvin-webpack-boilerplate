const {
  BundleAnalyzerPlugin,
} = require('webpack-bundle-analyzer');

const prod = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
};

const dev = {
  plugins: [
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
    }),
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};

