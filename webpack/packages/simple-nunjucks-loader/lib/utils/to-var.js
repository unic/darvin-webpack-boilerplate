"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toVar = toVar;

function toVar(symb) {
  return symb.replace(/[.-]/g, '_');
}