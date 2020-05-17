"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexOf = indexOf;

/**
 * @param {array}    list
 * @param {function} callback
 * @returns {number}
 */
function indexOf(list, callback) {
  const item = list.find(callback);
  return list.indexOf(item);
}