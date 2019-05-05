const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const dev = {
  plugins: [
    new BrowserSyncPlugin({
      proxy: 'https://unic.local',
      port: 3000,
      files: ['css/*.css', 'js/*.js'],
      open: true,
      https: true,
      notify: false,
      logConnections: true,
      reloadOnRestart: true,
      injectChanges: true,
      online: true,
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
      }
    }),
  ],
}

module.exports = {
  prod: {},
  dev: dev
};

