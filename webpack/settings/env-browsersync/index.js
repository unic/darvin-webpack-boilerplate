const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const dev = {
  plugins: [
    new BrowserSyncPlugin({
      /* proxy: 'https://cms.local', */
      server: {
        baseDir: ['dist'],
        directory: false,
      },
      startPath: 'index.html',
      port: 1712,
      files: ['css/*.css', 'js/*.js', '**/*.njk'],
      open: true,
      https: false,
      notify: false,
      logConnections: true,
      reloadOnRestart: true,
      injectChanges: true,
      online: true,
      //reloadDelay: 30,
      ghostMode: {
        clicks: false,
        forms: false,
        scroll: false,
      },
    }),
  ],
}

module.exports = {
  prod: {},
  dev: dev
};

