"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getPossiblePaths = getPossiblePaths;

var _path = _interopRequireDefault(require("path"));

var _unquote = require("./unquote");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getFilePath(searchPath, possiblePath) {
  const [firstPart, ...restParts] = possiblePath.split(' + ');

  const filePath = _path.default.resolve(searchPath, (0, _unquote.unquote)(firstPart));

  return restParts.length > 0 ? `${[`"${filePath}"`, ...restParts].join(' + ')}` : filePath;
}
/**
 * @param {string[]} paths
 * @param {string[]} searchPaths
 * @returns {Array.<[string, array]>}
 */


function getPossiblePaths(paths, searchPaths) {
  return paths.map(function (possiblePath) {
    return [possiblePath, searchPaths.map(searchPath => [_path.default.resolve(searchPath), getFilePath(searchPath, possiblePath)]).filter(function ([basePath, filePath]) {
      return (0, _unquote.unquote)(filePath).startsWith(basePath);
    }).map(function ([, filePath]) {
      return filePath;
    })];
  });
}