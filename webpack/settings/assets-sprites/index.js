const path = require('path');
const basePath = process.cwd();
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const prod = {
  plugins: [
    new SVGSpritemapPlugin(path.join(basePath, global.inputDirs.src + '/' + global.server.assets + '/images/icons/**/*.svg'), {
      output: {
        filename: global.server.assets + '/images/svg-sprite.svg',
        svg4everybody: false,
        svg: {
          sizes: false
        }
      },
      sprite: {
        generate: {
          use: true,
          view: '-fragment',
          symbol: true
        },
      },
      styles: {
        format: 'fragment',
        filename: path.join(basePath, global.inputDirs.src + '/styles/tools/_sprites.scss')
      }
    })
  ],
};

const dev = {
  plugins: [
    new SVGSpritemapPlugin(path.join(basePath, global.inputDirs.src + '/' + global.server.assets + '/images/icons/**/*.svg'), {
      output: {
        filename: global.server.assets + '/images/svg-sprite.svg',
        svg4everybody: false,
        svg: {
          sizes: false
        }
      },
      sprite: {
        gutter: 5,
        generate: {
          use: true,
          view: '-fragment',
          symbol: true
        },
      },
      styles: {
        format: 'fragment',
        filename: path.join(basePath, global.inputDirs.src + '/styles/tools/_sprites.scss')
      }
    })
  ],
};

const prev = {
  plugins: [
    new SVGSpritemapPlugin(basePath + '/preview/assets/images/icons/**/*.svg', {
      output: {
        filename: global.server.assets + '/images/svg-sprite.svg',
        svg4everybody: false,
        svg: {
          sizes: false
        }
      },
      sprite: {
        generate: {
          use: true,
          view: '-fragment',
          symbol: true,
        },
      },
      styles: {
        format: 'fragment',
        filename: path.join(basePath, 'preview/styles/tools/_sprites.scss')
      }
    })
  ],
};

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
