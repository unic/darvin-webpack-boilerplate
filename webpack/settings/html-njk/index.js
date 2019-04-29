const path = require('path');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');
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
    ...htmlTemplates
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
