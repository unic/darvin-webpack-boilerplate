const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: `${basePath}/changelog.md`,
        to: `${global.server.assets}/log/`,
        flatten: true,
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
        to: global.server.assets + '/images/',
        flatten: true,
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/favicons/favicon-dev.ico`,
        flatten: true,
        transformPath () {
          return 'favicon.ico';
        }
      },
    ], {})
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: `${basePath}/changelog.md`,
        to: `${global.server.assets}/log/`,
        flatten: true,
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
        to: global.server.assets + '/images/',
        flatten: true,
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/favicons/favicon-dev.ico`,
        flatten: true,
        transformPath () {
          return 'favicon.ico';
        }
      },
    ], {})
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
