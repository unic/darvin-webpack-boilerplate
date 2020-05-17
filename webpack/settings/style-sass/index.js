const MiniCssExtractPlugin = require("extract-css-chunks-webpack-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const autoprefixer = require('autoprefixer');
const OptimizeCssnanoPlugin = require('@intervolga/optimize-cssnano-plugin');
const isDevServer = process.env.WEBPACK_DEV_SERVER;

let outputDir = `${global.server.assets}/css/style.[hash].css`;

// remove hash for devserver hot reload
if(isDevServer) {
  outputDir = `${global.server.assets}/css/style.css`;
}

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
              })
            ],
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: '$env: ' + process.env.NODE_ENV + ';',
            webpackImporter: false,
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
      filename: outputDir
    }),
    new OptimizeCssnanoPlugin({
      cssnanoOptions: {
        preset: ['default', {
          calc: false,
          discardComments: {
            removeAll: true,
          },
        }],
      },
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
            reloadAll: false
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
              })
            ],
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: '$env: ' + process.env.NODE_ENV + ';',
            webpackImporter: false,
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
      filename: outputDir
    }),
  ]
};

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
              })
            ],
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            prependData: '$env: ' + process.env.NODE_ENV + ';',
            webpackImporter: false,
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
};


module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
