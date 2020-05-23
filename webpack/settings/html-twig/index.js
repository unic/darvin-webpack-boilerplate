const path = require('path');

const basePath = process.cwd();
const htmlTemplates = require('../../libs/html-templates');

const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const twigOptions = JSON.stringify({
  searchPaths: `${basePath}/src/templates/`,
  context: htmlTemplates.templates(),
  namespaces: {
    'layouts': `${basePath}/src/templates/layouts`,
    'components': `${basePath}/src/templates/components`,
    'modules':  `${basePath}/src/templates/modules`,
    'pages': `${basePath}/src/templates/pages`
  }
});

const prod = {
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: ['html-loader', `${path.resolve('webpack/libs/twig-loader.js')}?${twigOptions}`],
      },
    ]
  },
  plugins: [
    ...htmlTemplates.templates(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],
};

const dev = {
  module: {
    rules: [
      {
        test: /\.twig$/,
        loader: ['html-loader', `${path.resolve('webpack/libs/twig-loader.js')}?${twigOptions}`]
      },
    ]
  },
  plugins: [
    ...htmlTemplates.templates(),
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: 'async'
    })
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
