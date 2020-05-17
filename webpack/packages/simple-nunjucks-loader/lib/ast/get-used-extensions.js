"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsedExtensions = getUsedExtensions;

var _getUsagesOf = require("./get-usages-of");

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @template TNode
 * @param {nunjucks.nodes.Root} nodes
 * @param {Array[]}             instances
 * @returns {TNode[]}
 */
function getUsedExtensions(nodes, instances) {
  return (0, _getUsagesOf.getUsagesOf)(_nunjucks.default.nodes.CallExtension, nodes)(instances, ({
    extName
  }) => ([name,, instance]) => {
    // Sometime `extName` is instance of custom tag
    return name === extName || instance === extName;
  });
}