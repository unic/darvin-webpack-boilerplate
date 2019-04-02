const prod = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
  }
};

const dev = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
  }
}

module.exports = {
  prod: prod,
  dev: dev
};

