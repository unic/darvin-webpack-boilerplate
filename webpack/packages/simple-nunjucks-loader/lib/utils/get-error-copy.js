"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getErrorCopy = getErrorCopy;

function getErrorCopy(error) {
  const newError = new Error(error.message);
  newError.code = error.code;
  return newError;
}