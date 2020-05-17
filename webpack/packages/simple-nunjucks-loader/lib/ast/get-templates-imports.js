"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTemplatesImports = getTemplatesImports;

var _getDependenciesTemplates = require("./get-dependencies-templates");

var _getPossiblePaths = require("../utils/get-possible-paths");

var _getFirstExistedPath = require("../utils/get-first-existed-path");

/**
 * @param {nunjucks.nodes.Root} nodes
 * @param {string[]}            searchPaths
 * @returns {Promise<[string, string][]>}
 */
function getTemplatesImports(nodes, searchPaths) {
  const templateDeps = (0, _getDependenciesTemplates.getDependenciesTemplates)(nodes);
  const possiblePaths = (0, _getPossiblePaths.getPossiblePaths)(templateDeps, searchPaths);
  const resolvedTemplates = possiblePaths.map(function ([path, paths]) {
    return (0, _getFirstExistedPath.getFirstExistedPath)(paths).then(function (importPath) {
      return [path, importPath];
    }, function () {
      throw new Error(`Template "${path}" not found`);
    });
  });
  return Promise.all(resolvedTemplates);
}