"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getGlobals = getGlobals;

var _toVar = require("../utils/to-var");

var _loaderUtils = require("loader-utils");

function getGlobals(globals) {
  function imports(loaderContext) {
    return globals.map(([globalImport, globalPath]) => `
                var _global_${(0, _toVar.toVar)(globalImport)} = require(${(0, _loaderUtils.stringifyRequest)(loaderContext, globalPath)});
                __nunjucks_module_dependencies__.globals['${globalImport}'] = {
                    module: _global_${(0, _toVar.toVar)(globalImport)}
                };
            `).join('');
  }

  return {
    imports
  };
}