const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const StyleLintPlugin = require('stylelint-webpack-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const isDevServer = process.env.WEBPACK_DEV_SERVER;

let outputDir = `${global.server.assets}/css/style.[fullhash].css`;
let outputDirPreview = `styles/preview.css`;

// remove hash for devserver hot reload
if(isDevServer) {
  outputDir = `${global.server.assets}/css/style.css`;
}

const prod = {
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
            emit: true
          }
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
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: '$env: ' + process.env.NODE_ENV + ';',
            webpackImporter: false,
          }
        },
        ],
      }
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
      filename: outputDir,
      chunkFilename: "[id].css"
    })
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
            esModule: false,
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

            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: '$env: ' + process.env.NODE_ENV + ';',
            webpackImporter: false,
          }
        },
        ],
      }
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
      filename: outputDir,
      chunkFilename: "[id].css"
    }),
  ]
};


const prev = {
  optimization: {
    minimizer: [
      // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`)
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            esModule: true,
            emit: true
          }
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
            sourceMap: false,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: '$env: ' + process.env.NODE_ENV + ';',
            webpackImporter: false,
          }
        },
        ],
      }
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
      filename: outputDirPreview,
      chunkFilename: "[id].css"
    })
  ]
};


module.exports = {
  prod: prod,
  dev: dev,
  prev: prev
};
