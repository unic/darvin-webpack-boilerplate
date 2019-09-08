const path = require('path');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');
const htmlTemplates = require('../../libs/html-templates');
const nunjucksDevConfig = require('./config/config.dev.json');
const nunjucksProdConfig = require('./config/config.prod.json');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

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
    ...templates,
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
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
    ...templates,
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
