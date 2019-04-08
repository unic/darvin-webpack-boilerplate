const prod = {
  module: {
    rules: [
      {
        test: /\.(config.js)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: global.serverAssets + '/js/',
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
        test: /\.(config.js)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: global.serverAssets + '/js/',
          },
        }],
      },
    ]
  },
}

module.exports = {
  prod: prod,
  dev: dev
};
