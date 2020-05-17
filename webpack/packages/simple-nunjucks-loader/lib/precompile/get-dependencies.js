"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDependencies = getDependencies;

var _localVarPrecompile = require("./local-var-precompile");

var _getAddonsMeta = require("./get-addons-meta");

var _configureEnvironment = require("./configure-environment");

var _getNodes = require("../ast/get-nodes");

var _getUsedGlobals = require("../ast/get-used-globals");

var _getUsedExtensions = require("../ast/get-used-extensions");

var _getUsedFilters = require("../ast/get-used-filters");

var _getAssets = require("../ast/get-assets");

var _getTemplatesImports = require("../ast/get-templates-imports");

/**
 * @typedef {Object} NunjucksOptions
 * @property {boolean}                 [autoescape=true]
 * @property {boolean}                 [throwOnUndefined=false]
 * @property {boolean}                 [trimBlocks=false]
 * @property {boolean}                 [lstripBlocks=false]
 * @property {Object.<string, string>} [tags]
 * @property {string}                  [templatesPath]
 */

/**
 * @typedef {Object} TemplatePossiblePaths
 * @property {string}   name
 * @property {string[]} paths
 */

/**
 * @typedef {Object} PrecompiledDependencyLink
 * @property {string} originalName Name as it appear in template
 * @property {string} fullPath     Resolved absolute path
 */

/**
 * @typedef {Object} PrecompiledDependency
 * @property {string}                      precompiled
 * @property {PrecompiledDependencyLink[]} dependencies
 */

/**
 * @param {string} resourcePath
 * @param {string} source
 * @param {NunjucksOptions} options
 * @returns {Promise<Object>}
 */
async function getDependencies(resourcePath, source, options) {
  const {
    searchPaths,
    assetsPaths,
    globals,
    extensions,
    filters,
    ...opts
  } = options;
  const [extensionsInstances, filtersInstances] = await Promise.all([(0, _getAddonsMeta.getAddonsMeta)(extensions), (0, _getAddonsMeta.getAddonsMeta)(filters)]);
  const nodes = (0, _getNodes.getNodes)(source, extensionsInstances.map(([,, ext]) => ext), opts);
  return Promise.all([(0, _localVarPrecompile.precompileToLocalVar)(source, resourcePath, (0, _configureEnvironment.configureEnvironment)({
    searchPaths,
    options: opts,
    extensions: extensionsInstances,
    filters: filtersInstances
  })), (0, _getTemplatesImports.getTemplatesImports)(nodes, searchPaths)]).then(function ([precompiled, dependencies]) {
    return {
      precompiled,
      dependencies,
      globals: (0, _getUsedGlobals.getUsedGlobals)(nodes, globals),
      extensions: (0, _getUsedExtensions.getUsedExtensions)(nodes, extensionsInstances),
      filters: (0, _getUsedFilters.getUsedFilters)(nodes, filtersInstances)
    };
  }).then(function (deps) {
    return (0, _getAssets.getAssets)(nodes, assetsPaths).then(function (assets) {
      return { ...deps,
        assets
      };
    });
  });
}