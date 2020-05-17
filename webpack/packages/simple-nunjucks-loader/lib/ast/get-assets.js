"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssets = getAssets;

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _getNodesValues = require("./get-nodes-values");

var _isUnique = require("../utils/is-unique");

var _getPossiblePaths = require("../utils/get-possible-paths");

var _getFirstExistedPath = require("../utils/get-first-existed-path");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Parse `Add` value to expression
 * @example
 *   'foo' + bar + 'qux'
 *
 * @param {nunjucks.nodes.Add} node
 */
function getAddNodeValue(node) {
  if (!(node instanceof _nunjucks.default.nodes.Add)) {
    throw new TypeError('Wrong node type');
  }

  return [node.left, node.right].map(function (node) {
    if (node instanceof _nunjucks.default.nodes.Add) {
      return getAddNodeValue(node);
    }

    if (node instanceof _nunjucks.default.nodes.Literal) {
      return `"${node.value}"`;
    }

    if (node instanceof _nunjucks.default.nodes.Symbol) {
      return node.value;
    }

    throw new TypeError('Unsupported node signature');
  }).join(' + ');
}

function getGlobalFnValue(node) {
  if (node.name.value !== 'static') {
    return;
  }

  const [asset] = node.args.children;

  if (asset instanceof _nunjucks.default.nodes.Add) {
    return getAddNodeValue(asset);
  }

  return asset.value;
}
/**
 * @param {nunjucks.nodes.Root} nodes
 * @param {string|string[]}     searchAssets
 * @returns {Promise<[string, string][]>}
 */


function getAssets(nodes, searchAssets) {
  const assets = (0, _getNodesValues.getNodesValues)(nodes, _nunjucks.default.nodes.FunCall, getGlobalFnValue).filter(_isUnique.isUnique);
  const possiblePaths = (0, _getPossiblePaths.getPossiblePaths)(assets, [].concat(searchAssets));
  const resolvedAssets = possiblePaths.map(function ([path, paths]) {
    return (0, _getFirstExistedPath.getFirstExistedPath)(paths).then(function (importPath) {
      return [path, importPath];
    }, function (error) {
      if (error.code !== _constants.ERROR_MODULE_NOT_FOUND) {
        throw new Error(`Asset "${path}" not found`);
      }

      throw error;
    });
  });
  return Promise.all(resolvedAssets);
}