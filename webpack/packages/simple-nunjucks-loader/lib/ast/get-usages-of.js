"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsagesOf = getUsagesOf;

var _toListItem = require("../utils/to-list-item");

var _indexOf = require("../utils/index-of");

/**
 * Filter list of nodes
 *
 * @template TNode
 * @param {nunjucks.nodes.Node} nodeType
 * @param {nunjucks.nodes.Root} nodes
 * @returns {function(TNode[], function(TNode): Function): TNode[]}
 */
function getUsagesOf(nodeType, nodes) {
  const nodesOfType = nodes.findAll(nodeType);
  /**
   * @template TNode
   * @param {TNode[]} list
   * @param {function(TNode): function} callback
   * @returns {TNode[]}
   */

  function filterNodes(list, callback) {
    return nodesOfType.map((0, _toListItem.toListItem)(list, callback)).filter(Boolean).filter(([addonName], i, list) => i === (0, _indexOf.indexOf)(list, ([name]) => addonName === name));
  }

  return filterNodes;
}