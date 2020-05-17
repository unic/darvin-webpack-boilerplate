var webpack = require('webpack');

const prod = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
};

const dev = {
  resolve: {
    extensions: ['*', '.js', '.jsx', '.json']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

module.exports = {
  prod: prod,
  dev: dev
};
