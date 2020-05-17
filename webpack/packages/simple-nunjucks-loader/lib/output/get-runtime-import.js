"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRuntimeImport = getRuntimeImport;

var _loaderUtils = require("loader-utils");

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getRuntimeImport(loaderContext) {
  return `var runtime = require(${(0, _loaderUtils.stringifyRequest)(loaderContext, `${_path.default.resolve(_path.default.join(__dirname, '..', 'runtime.js'))}`)});`;
}