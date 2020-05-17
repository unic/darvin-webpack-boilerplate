"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.configureEnvironment = configureEnvironment;

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _getModule = require("../utils/get-module");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param env
 * @param {Object}   options
 * @param {string[]} options.searchPaths
 * @param {Object}   options.options
 * @param {Array}    options.extensions
 * @param {Array}    options.filters
 * @returns {nunjucks.Environment}
 */
function configureEnvironment({
  searchPaths,
  options,
  extensions = [],
  filters = []
} = {}) {
  const env = _nunjucks.default.configure(searchPaths, options);

  extensions.forEach(function ([name,, extensionInstance]) {
    env.addExtension(name, (0, _getModule.getModule)(extensionInstance));
  });
  filters.forEach(function ([filterName,, filterInstance]) {
    const module = (0, _getModule.getModule)(filterInstance);
    env.addFilter(filterName, module, module.async === true);
  });
  return env;
}