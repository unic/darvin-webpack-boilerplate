const prod = {
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: global.server.assets + '/fonts/',
            publicPath: '../fonts/'
          },
        }],
      },
    ]
  },
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: global.server.assets + '/fonts/',
          },
        }],
      },
    ]
  },
}

const prev = {
  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: '../preview/assets/fonts/',
          },
        }],
      },
    ]
  },
}

module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
