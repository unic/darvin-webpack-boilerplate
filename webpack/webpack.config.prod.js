const modern = require("./webpack.config.prod.modern.js");
const legacy = require("./webpack.config.prod.legacy.js");
const webpackConfig = require('../webpack.config');

module.exports = [
  legacy,
  modern
];
