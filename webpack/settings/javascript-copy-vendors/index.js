const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

const copyConfig = {
  from: basePath + '/' + global.inputDirs.src + '/scripts/vendors/*.js',
  to: global.server.assets + '/scripts/vendors/',
  flatten: true,
  cache: true
};

const prod = {
  plugins: [
    new CopyWebpackPlugin([
      copyConfig,
    ], {})
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin([
      copyConfig,
    ], {})
  ],
};

module.exports = {
  prod: prod,
  dev: dev
};
