const MiniCssExtractPlugin = require("extract-css-chunks-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
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
            sourceMap: false,
            importLoaders: 2,
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [
              autoprefixer({
                grid: 'autoplace',
                flexbox: 'no-2009'
              }),
              require('postcss-css-variables')({ preserve : false, preserveAtRulesOrder: true })
            ],
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            fiber: Fiber,
            data: "$env: " + process.env.NODE_ENV + ";"
          }
        },
        ],
      },
    ]
  },
  plugins: [
    new StyleLintPlugin({
      context: 'src',
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
    new MiniCssExtractPlugin({
      filename: global.server.assets + '/css/style-legacy.[hash].css'
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
          options: {
            hot: true,
            reloadAll: true
          }
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
                grid: 'autoplace',
                flexbox: 'no-2009'
              }),
              require('postcss-css-variables')({ preserve : true, preserveAtRulesOrder: true })
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            fiber: Fiber,
            data: "$env: " + process.env.NODE_ENV + ";"
          }
        },
        ],
      },
    ]
  },
  plugins: [
    new StyleLintPlugin({
      context: 'src',
      configFile: '.stylelintrc',
      files: '**/*.scss',
      failOnError: false,
      quiet: false,
      syntax: 'scss'
    }),
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
                grid: 'autoplace',
                flexbox: 'no-2009'
              }),
              require('postcss-css-variables')({ preserve : true, preserveAtRulesOrder: true })
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            implementation: require("sass"),
            fiber: Fiber,
            data: "$env: " + process.env.NODE_ENV + ";"
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
