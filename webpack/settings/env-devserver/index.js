const path = require('path');
const basePath = process.cwd();

let devServer = require('../../libs/devserver-storage');

const dev = {
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    onBeforeSetupMiddleware: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      // set storage
      devServer.server = devServer;
      devServer.app = devServer.app;
    },
    static: [
      {
        directory: path.join(basePath, '/dist/assets'),
        publicPath: '/assets',
      },
      {
        directory: path.join(basePath, '/dist/preview'),
        publicPath: '/preview',
      },
    ],
    client: {
      logging: 'info',
      progress: false,
      overlay: {
        errors: true,
        warnings: false,
      },
    },
    https: false,
    compress: true,
    port: global.port,
    open: true,
    hot: true,
    liveReload: true,
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
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }

      const port = devServer.server.address().port;
      console.log('|> Darvin running on port:', port);
    },
  }
}

module.exports = {
  prod: {},
  dev: dev
};
