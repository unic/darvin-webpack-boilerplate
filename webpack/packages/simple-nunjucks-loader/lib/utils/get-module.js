"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getModule = getModule;

function getModule(importedSymbol) {
  return importedSymbol && importedSymbol.default || importedSymbol;
}