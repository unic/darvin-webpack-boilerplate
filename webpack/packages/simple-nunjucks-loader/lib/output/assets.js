"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDynamic = isDynamic;
exports.isDynamicPath = isDynamicPath;
exports.getArgs = getArgs;

function isDynamic(part) {
  return /^['"]/.test(part);
}

function isDynamicPath(path) {
  return path.split(' + ').some(isDynamic);
}

function getArgs(path) {
  return path.split(' + ').filter(function (part) {
    return !isDynamic(part);
  });
}