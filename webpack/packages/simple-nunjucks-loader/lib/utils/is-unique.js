"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isUnique = isUnique;

function isUnique(item, i, list) {
  return list.indexOf(item) === i;
}