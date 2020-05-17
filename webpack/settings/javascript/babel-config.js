const path = require('path');
const ROOT_PATH = process.cwd();

const CACHE_PATH = path.join(ROOT_PATH, 'tmp/cache');

const modern = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        browsers: [
          "> 1% in CH",
          "not ie 11",
          "not dead"
        ]
      },
      useBuiltIns: "usage",
      corejs: 3,
    }]
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "transform-eval"
  ],
  comments: false,
  cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
};

const legacy = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        browsers: [
          "> 1% in CH",
          "ie >= 11",
          "not dead"
        ]
      },
      useBuiltIns: "usage",
      corejs: 3,
    }]
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "transform-eval"
  ],
  comments: false,
  cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
};


const modernReact = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        browsers: [
          "> 1% in CH",
          "not ie 11",
          "not dead"
        ]
      },
      useBuiltIns: "usage",
      corejs: 3,
    }],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "transform-eval"
  ],
  comments: false,
  cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
};

const legacyReact = {
  presets: [
    ["@babel/preset-env", {
      targets: {
        browsers: [
          "> 1% in CH",
          "ie >= 11",
          "not dead"
        ]
      },
      useBuiltIns: "usage",
      corejs: 3,
    }],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-proposal-class-properties",
    "transform-eval"
  ],
  comments: false,
  cacheDirectory: path.join(CACHE_PATH, 'babel-loader')
};

module.exports = {
  modern,
  legacy,
  modernReact,
  legacyReact
};
