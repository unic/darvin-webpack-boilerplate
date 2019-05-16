const StyleLintPlugin = require('stylelint-webpack-plugin');

const prod = {
  plugins: [
    new StyleLintPlugin({
      context: 'src/styles',
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
  ]
};

const dev = {
  plugins: [
    new StyleLintPlugin({
      context: 'src/styles',
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
  ]
}

const prev = {
  plugins: [
    new StyleLintPlugin({
      context: 'src/styles',
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
  ]
}


module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
