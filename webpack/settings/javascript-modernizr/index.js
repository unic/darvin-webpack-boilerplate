const prod = {
  module: {
    rules: [
      {
        test: /modernizrrc\.js$/,
        loader: 'expose-loader?Modernizr!webpack-modernizr-loader',
      },
    ]
  },
};

const dev = {
  module: {
    rules: [
      {
        test: /modernizrrc\.js$/,
        loader: 'expose-loader?Modernizr!webpack-modernizr-loader',
      },
    ]
  },
}

module.exports = {
  prod: prod,
  dev: dev
};
