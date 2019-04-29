const path = require('path');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');

const prod = {
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(global.inputDirs.src + '/' + global.inputDirs.assets + '/images/favicons/favicon-prod.png'),
      prefix: global.server.assets + '/images/icons/',
      emitStats: true,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#000',
      title: global.project,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false
      }
    })
  ],
};

const dev = {
  plugins: [
    new FaviconsWebpackPlugin({
      logo: path.resolve(global.inputDirs.src + '/' + global.inputDirs.assets + '/images/favicons/favicon-prod.png'),
      prefix: global.server.assets + '/images/icons/',
      emitStats: true,
      statsFilename: 'iconstats-[hash].json',
      persistentCache: true,
      inject: true,
      background: '#000',
      title: global.project,
      icons: {
        android: true,
        appleIcon: true,
        appleStartup: true,
        coast: false,
        favicons: true,
        firefox: true,
        opengraph: true,
        twitter: true,
        yandex: false,
        windows: false
      }
    })
  ],
}

module.exports = {
  prod: prod,
  dev: dev
};
