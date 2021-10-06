const prod = {
  module: {
    rules: [
      {
        loader: "webpack-modernizr-loader",
        test: /\.modernizrrc\.js$/
        // Uncomment this when you use `JSON` format for configuration
        // type: 'javascript/auto'
      }
    ]
  },
};

const dev = {
  module: {
    rules: [
      {
        loader: "webpack-modernizr-loader",
        test: /\.modernizrrc\.js$/
        // Uncomment this when you use `JSON` format for configuration
        // type: 'javascript/auto'
      }
    ]
  },
};

module.exports = {
  prod: prod,
  dev: dev
};
