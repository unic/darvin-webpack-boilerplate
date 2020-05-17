"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFilters = getFilters;

var _loaderUtils = require("loader-utils");

function getFilters(filters) {
  function imports(loaderContext) {
    return filters.map(([filterName, importPath, filterInstance]) => `
            var _filter_${filterName} = require(${(0, _loaderUtils.stringifyRequest)(loaderContext, importPath)});
            __nunjucks_module_dependencies__.filters['${filterName}'] = {
                module: _filter_${filterName},
                async: ${JSON.stringify(filterInstance.async === true)}
            };
        `).join('');
  }

  return {
    imports
  };
}