"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toListItem = toListItem;

/**
 * @template TNode
 * @param {TNode[]}                   list
 * @param {function(TNode): function} callback
 * @returns {function(Object<TNode>): ?TNode}
 */
function toListItem(list, callback) {
  /**
   * @template TNode
   * @param {Object<TNode>} item
   * @returns {?TNode}
   */
  function foo(item) {
    return list.find(callback(item));
  }

  return foo;
}