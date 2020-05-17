"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAssets = getAssets;

var _loaderUtils = require("loader-utils");

var _assets = require("./assets");

/**
 * @param {Array.<string[]>} assets
 */
function getAssets(assets) {
  function imports(loaderContext) {
    const assetsImports = assets.map(function ([uuid, assetPath, assetImport]) {
      const args = (0, _assets.getArgs)(assetPath);
      const isDynamicImport = assetImport.startsWith('"');
      let importPath;

      if (isDynamicImport) {
        importPath = assetImport.split(' + ').map(function (part) {
          if (part.startsWith('"')) {
            return (0, _loaderUtils.stringifyRequest)(loaderContext, part.replace(/^"|"$/g, ''));
          }

          return part;
        }).join(' + ');
      } else {
        importPath = (0, _loaderUtils.stringifyRequest)(loaderContext, assetImport);
      }

      const importInvocation = isDynamicImport ? `function(${args.join()}) {
                    return require(${importPath});
                }` : `require(${importPath})`;
      return `_templateAssets['${uuid}'] = ${importInvocation};`;
    }).join('');
    return `
            var _templateAssets = {};
            
            ${assetsImports}
        `;
  }

  return {
    imports
  };
}