const {
  VueLoaderPlugin,
} = require('vue-loader');

const prod = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.vue'],
    alias: {
      vue$: 'vue/dist/vue.esm.js',
    },
  }
};

const dev = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.vue', '.json'],
  },
}

module.exports = {
  prod: prod,
  dev: dev
};
