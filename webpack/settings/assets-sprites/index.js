const path = require('path');
const basePath = process.cwd();
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const prod = {
  plugins: [
    new SVGSpritemapPlugin(basePath + '/' + global.dirRoot + '/' + global.serverAssets + '/images/icons/**/*.svg', {
      output: {
        filename: global.serverAssets + '/images/svg-sprite.svg',
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
        filename: path.join(basePath, global.dirRoot + '/styles/settings/_sprites.scss')
      }
    })
  ],
};

const dev = {
  plugins: [
    new SVGSpritemapPlugin(basePath + global.dirRoot + '/' + global.serverAssets + '/images/icons/**/*.svg', {
      output: {
        filename: global.serverAssets + '/images/svg-sprite.svg',
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
        filename: path.join(basePath, global.dirRoot + '/styles/settings/_sprites.scss')
      }
    })
  ],
}

const prev = {
  plugins: [
    new SVGSpritemapPlugin(basePath + '/preview/assets/images/icons/**/*.svg', {
      output: {
        filename: global.serverAssets + '/images/svg-sprite.svg',
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
        filename: path.join(basePath, 'preview/styles/settings/_sprites.scss')
      }
    })
  ],
}

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
