"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toRegExpSource = toRegExpSource;
const reSafeSymbols = /([.*+?^=!:${}()|[\]/\\])/g;
/**
 * @param {string} str
 * @returns {string}
 */

function toRegExpSource(str) {
  return str.replace(reSafeSymbols, '\\$1');
}