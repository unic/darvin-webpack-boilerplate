const path = require('path');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');
const htmlTemplates = require('../../libs/html-templates');
const nunjucksDevConfig = require('../../../src/templates/config/config.dev.json');
const nunjucksProdConfig = require('../../../src/templates/config/config.prod.json');

htmlTemplates.config = (isDev) ? nunjucksDevConfig : nunjucksProdConfig;

const nunjucksOptions = JSON.stringify({
  searchPaths: `${basePath}/src/templates/`,
  context: htmlTemplates,
});

const templates = htmlTemplates.templates;

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
    ...templates
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
    ...templates
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
