const path = require('path');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');

const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const nunjucksContext = require('../../libs/nunjucks-context');
const nunjucksDevConfig = require('../../../src/templates/config/config.dev.json');
const nunjucksProdConfig = require('../../../src/templates/config/config.prod.json');

nunjucksContext.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
  searchPaths: `${basePath}/src/templates/`,
  context: nunjucksContext,
});

const htmlTemplates = nunjucksContext.htmlTemplates;

const prod = {
  module: {
    rules: [
      {
        test: /\.(njk|nunjucks)$/,
        loader: ['html-loader', `${path.resolve('webpack/libs/nunjucks-loader.js')}?${nunjucksOptions}`],
      },
    ]
  },
  plugins: [
    ...htmlTemplates,
    new FaviconsWebpackPlugin({
      logo: path.resolve('src/assets/images/favicons/favicon-prod.png'),
      prefix: 'assets/images/icons/',
      emitStats: false,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#000',
      title: 'Darvin',
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: false,
        twitter: false,
        yandex: false,
        windows: false
      }
    })
  ],
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(njk|nunjucks)$/,
        loader: ['html-loader', `${path.resolve('webpack/libs/nunjucks-loader.js')}?${nunjucksOptions}`],
      },
    ]
  },
  plugins: [
    ...htmlTemplates
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
