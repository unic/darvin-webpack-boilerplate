const prod = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
};

const dev = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'ts-loader',
          options: {
            appendTsSuffixTo: [/\.vue$/]
          }
        }
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
};

module.exports = {
  prod: prod,
  dev: dev
};
