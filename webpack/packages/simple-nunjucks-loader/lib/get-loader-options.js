"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLoaderOptions = getLoaderOptions;

var _loaderUtils = require("loader-utils");

var _schemaUtils = _interopRequireDefault(require("schema-utils"));

var _schema = _interopRequireDefault(require("./schema"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLoaderOptions(loader, callback) {
  let loaderOptions;

  try {
    loaderOptions = (0, _loaderUtils.getOptions)(loader);
  } catch (e) {
    callback(e);
  }

  const {
    autoescape,
    throwOnUndefined,
    trimBlocks,
    lstripBlocks,
    tags,
    jinjaCompat = false,
    searchPaths = '.',
    assetsPaths = '.',
    globals = {},
    extensions = {},
    filters = {}
  } = loaderOptions;
  const options = {
    autoescape,
    throwOnUndefined,
    trimBlocks,
    lstripBlocks,
    jinjaCompat,
    tags,
    searchPaths,
    assetsPaths,
    globals,
    extensions,
    filters
  };

  try {
    (0, _schemaUtils.default)(_schema.default, options, {
      name: 'Simple Nunjucks Loader',
      baseDataPath: 'options'
    });
  } catch (e) {
    callback(e);
  }

  return options;
}