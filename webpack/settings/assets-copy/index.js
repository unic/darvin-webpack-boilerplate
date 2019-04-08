const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: basePath + '/log/*.{md,json}',
        to: global.serverAssets + '/log/',
        flatten: true
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/**/meta/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/**/log/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/modules/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/components/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.serverAssets + '/images/renditions/**/*.{png,gif,jpg,svg}',
        to: global.serverAssets + '/images/',
        flatten: true,
      }
    ], {})
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin(
    [
      {
        from: basePath + '/log/*.{md,json}',
        to: global.serverAssets + '/log/',
        flatten: true
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.serverAssets + '/images/favicons/favicon-dev.ico',
        flatten: true,
        transformPath () {
          return 'favicon.ico';
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/**/meta/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/**/log/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/modules/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.dirTemplate + '/components/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/' + global.dirRoot + '/' + global.dirTemplate + '/')[1];
        }
      },
      {
        from: basePath + '/' + global.dirRoot + '/' + global.serverAssets + '/images/renditions/*.{png,gif,jpg,svg}',
        to: global.serverAssets + '/images/',
        flatten: true,
      }
    ], {})
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
