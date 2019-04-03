const CopyWebpackPlugin = require('copy-webpack-plugin');
const basePath = process.cwd();

const prod = {
  plugins: [
    new CopyWebpackPlugin([
      {
        from: basePath + '/log/*.{md,json}',
        to: 'assets/log/',
        flatten: true
      },
      {
        from: basePath + '/src/templates/**/meta/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/templates/**/log/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/templates/modules/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/templates/components/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/assets/images/renditions/**/*.{png,gif,jpg,svg}',
        to: 'assets/images/',
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
        to: 'assets/log/',
        flatten: true
      },
      {
        from: basePath + '/src/assets/images/favicons/favicon-dev.ico',
        flatten: true,
        transformPath () {
          return 'favicon.ico';
        }
      },
      {
        from: basePath + '/src/templates/**/meta/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/templates/**/log/*.{md,json}',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/templates/modules/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/templates/components/**/*.njk',
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split('/src/templates/')[1];
        }
      },
      {
        from: basePath + '/src/assets/images/renditions/*.{png,gif,jpg,svg}',
        to: 'assets/images/',
        flatten: true,
      }
    ], {})
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
