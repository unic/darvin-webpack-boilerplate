const path = require('path');
const basePath = process.cwd();
const SVGSpritemapPlugin = require('svg-spritemap-webpack-plugin');

const prod = {
  plugins: [
    new SVGSpritemapPlugin(basePath + '/src/assets/images/icons/**/*.svg', {
      output: {
        filename: 'assets/images/svg-sprite.svg',
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
        filename: path.join(basePath, 'src/styles/settings/_sprites.scss')
      }
    })
  ],
};

const dev = {
  plugins: [
    new SVGSpritemapPlugin(basePath + '/src/assets/images/icons/**/*.svg', {
      output: {
        filename: 'assets/images/svg-sprite.svg',
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
        filename: path.join(basePath, 'src/styles/settings/_sprites.scss')
      }
    })
  ],
}

const prev = {
  plugins: [
    new SVGSpritemapPlugin(basePath + '/preview/assets/images/icons/**/*.svg', {
      output: {
        filename: 'assets/images/svg-sprite.svg',
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
