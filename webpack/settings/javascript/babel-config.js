const path = require('path');
const ROOT_PATH = process.cwd();

const CACHE_PATH = path.join(ROOT_PATH, 'tmp/cache');

const modern = {
  presets: [
    ["@babel/preset-env", {
      useBuiltIns: "usage",
      corejs: 3
    }],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties"
  ],
  comments: true,
  cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
};

const modernReact = {
  presets: [
    ["@babel/preset-react", {
      runtime: "automatic"
    }],
    ["@babel/preset-env", {
      useBuiltIns: "usage",
      corejs: 3
    }],
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties"
  ],
  comments: true,
  cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
};

module.exports = {
  modern,
  modernReact
};
