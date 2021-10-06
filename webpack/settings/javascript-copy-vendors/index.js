const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

const copyConfig = {
  from: `${basePath}/${global.inputDirs.src}/scripts/vendors/*.js`,
  to() {
    return `${global.server.assets}/scripts/vendors/[name][ext]`;
  },
};

const prod = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        copyConfig
      ]
    })
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        copyConfig
      ]
    })
  ],
};

module.exports = {
  prod: prod,
  dev: dev
};
