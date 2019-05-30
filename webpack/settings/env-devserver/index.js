const path = require('path');
const basePath = process.cwd();

let devServer = require('../../libs/devserver-storage');

const dev = {
  devServer: {
    before(app, server) {
      // set storage
      devServer.server = server;
      devServer.app = app;
    },
    contentBase: path.resolve(basePath, 'dist'),
    watchContentBase: false,
    compress: true,
    port: global.port,
    open: 'Google Chrome',
    writeToDisk: true,
    index: 'index.html'
  }
}

module.exports = {
  prod: {},
  dev: dev
};
