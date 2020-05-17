const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const browserSync = require('browser-sync');
let devServer = require('../../libs/devserver-storage');

const dev = {
  plugins: [
    new BrowserSyncPlugin({
      /* proxy: 'https://cms.local', */
      server: {
        baseDir: ['dist'],
        directory: false,
      },
      startPath: 'index.html',
      port: global.port,
      files: ['css/*.css', 'scripts/*.js'],
      open: true,
      https: false,
      notify: false,
      logConnections: true,
      reloadOnRestart: true,
      injectChanges: true,
      online: true,
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
      },
    },
    {
        name: 'bsInstance',
        callback: () => {
            let browserSyncInstance = browserSync.get('bsInstance');

            devServer.server = browserSyncInstance;
            devServer.app = "bs";
        }
    }),
  ],
}

module.exports = {
  prod: {},
  dev: dev
};

