"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getExtensions = getExtensions;

var _loaderUtils = require("loader-utils");

function getExtensions(extensions) {
  function imports(loaderContext) {
    return extensions.map(([name, importPath]) => `
                var _extension_${name} = require(${(0, _loaderUtils.stringifyRequest)(loaderContext, importPath)});
                __nunjucks_module_dependencies__.extensions['${name}'] = {
                    module: _extension_${name}
                };
            `).join('');
  }

  return {
    imports
  };
}