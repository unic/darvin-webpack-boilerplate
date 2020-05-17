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
    watchContentBase: true,
    compress: true,
    port: global.port,
    open: true,
    writeToDisk: true,
    index: 'index.html',
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': '*',
    },
    proxy: {
      "/api": {
        target: "http://localhost:8002",
        secure: false
      }
    },
  }
}

module.exports = {
  prod: {},
  dev: dev
};
