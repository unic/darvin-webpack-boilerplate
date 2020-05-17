"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsedFilters = getUsedFilters;

var _getUsagesOf = require("./get-usages-of");

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @template TNode
 * @param {nunjucks.nodes.Root} nodes
 * @param {Array[]}             instances
 * @returns {TNode[]}
 */
function getUsedFilters(nodes, instances) {
  return (0, _getUsagesOf.getUsagesOf)(_nunjucks.default.nodes.Filter, nodes)(instances, ({
    name
  }) => ([filterName]) => filterName === name.value);
}