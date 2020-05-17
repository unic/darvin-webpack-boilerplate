"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNodesValues = getNodesValues;

/**
 * @param {nunjucks.nodes.Root} nodes
 * @param {nunjucks.Node}       nodeType
 * @param {Function}            getValue
 * @returns {*}
 */
function getNodesValues(nodes, nodeType, getValue) {
  const nodesOfType = nodes.findAll(nodeType);
  return nodesOfType.map(getValue).filter(Boolean);
}