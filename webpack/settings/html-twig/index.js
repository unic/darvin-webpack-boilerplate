const path = require('path');

const basePath = process.cwd();
const isDev = (process.env.NODE_ENV === 'dev');
const htmlTemplates = require('../../libs/html-templates');

const templates = htmlTemplates.templates;

const twigOptions = JSON.stringify({
  searchPaths: `${basePath}/src/templates/`,
  context: htmlTemplates,
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
    ...templates
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
    ...templates
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
