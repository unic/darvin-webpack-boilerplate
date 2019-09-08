const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.join(basePath, 'dist/*'), '!' + path.join(basePath, 'dist/preview')]
    }),
  ],
};

const dev = {
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.join(basePath, 'dist/*'), '!' + path.join(basePath, 'dist/preview')]
    }),
  ],
}

const prev = {
  plugins: [
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
      protectWebpackAssets: false,
      cleanOnceBeforeBuildPatterns: [path.join(basePath, 'dist/preview/*/**')]
    }),
  ],
}


module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};

