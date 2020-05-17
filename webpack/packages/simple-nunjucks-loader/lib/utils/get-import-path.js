"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getImportPath = getImportPath;

var _path = _interopRequireDefault(require("path"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string}   resourcePath
 * @param {string[]} searchPaths
 * @returns {string}
 */
function getImportPath(resourcePath, searchPaths) {
  const [importPath] = searchPaths.map(searchPath => resourcePath.replace(_path.default.resolve(searchPath), '').replace(/^\//, '')).sort(function (a, b) {
    return a.length - b.length;
  });
  return importPath;
}