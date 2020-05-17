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
        from: `${basePath}/log/*.{md,json}`,
        to: `${global.server.assets}/log/`,
        flatten: true,
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/meta/**/*.{md,json}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/log/*.{md,json}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/modules/**/*.${global.template.extIn}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/components/**/*.${global.template.extIn}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
        to: global.server.assets + '/images/',
        flatten: true,
        cache: true
      }
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
        from: `${basePath}/log/*.{md,json}`,
        to: `${global.server.assets}/log/`,
        flatten: true,
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/meta/**/*.{md,json}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/log/*.{md,json}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/modules/**/*.${global.template.extIn}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
        cache: true
      },
      {
        from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/components/**/*.${global.template.extIn}`,
        to: '/',
        flatten: false,
        transformPath (targetPath) {
          return targetPath.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1];
        },
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
