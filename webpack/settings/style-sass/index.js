const MiniCssExtractPlugin = require("extract-css-chunks-webpack-plugin");
const autoprefixer = require('autoprefixer');
const Fiber = require('fibers');

const prod = {
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                flexbox: 'no-2009'
              }),
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            fiber: Fiber
          }
        },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: global.server.assets + '/css/style.css',
      hot: true
    }),
  ]
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                flexbox: 'no-2009'
              }),
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            fiber: Fiber
          }
        },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: global.server.assets + '/css/style.css',
    }),
  ]
}

const prev = {
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                flexbox: 'no-2009'
              }),
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            fiber: Fiber
          }
        },
        ],
      },
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/preview.css',
    }),
  ]
}


module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
