"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.unquote = unquote;

function unquote(str) {
  return str.replace(/(^"|"$)/g, '');
}