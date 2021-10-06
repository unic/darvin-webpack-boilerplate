const prod = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]?[fullhash]',
          },
        },
        {
          loader: 'image-webpack-loader',
          options: {
            mozjpeg: {
              progressive: true,
              quality: 65,
            },
            // optipng.enabled: false will disable optipng
            optipng: {
              enabled: false,
            },
            pngquant: {
              quality: [0.65, 0.90],
              speed: 4,
            },
            gifsicle: {
              interlaced: false,
            },
            // the webp option will enable WEBP
            webp: {
              quality: 75,
            },
          },
        },
        ],
      },
    ]
  },
};

const dev = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg|ico)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]?[fullhash]',
          },
        }
        ],
      },
    ]
  },
};

module.exports = {
  prod: prod,
  dev: dev
};
