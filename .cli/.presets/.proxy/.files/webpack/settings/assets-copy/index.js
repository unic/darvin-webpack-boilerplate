const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${basePath}/changelog.md`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/log/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/images/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/favicons/favicon-dev.ico`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/[name][ext]`;
          },
        },
      ]
    })
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${basePath}/changelog.md`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/log/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/images/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/favicons/favicon-dev.ico`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/[name][ext]`;
          },
        },
      ]
    })
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
