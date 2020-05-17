"use strict";

const crypto = require('crypto');
let devServer = require('../../../libs/devserver-storage');

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = nunjucksLoader;

var cacheRegister = {};

var _path = _interopRequireDefault(require("path"));

var _getDependencies = require("./precompile/get-dependencies");

var _getImportPath = require("./utils/get-import-path");

var _getLoaderOptions = require("./get-loader-options");

var _getRuntimeImport = require("./output/get-runtime-import");

var _getTemplateDependenciesImport = require("./output/get-template-dependencies-import");

var _getGlobals = require("./output/get-globals");

var _getExtensions = require("./output/get-extensions");

var _getFilters = require("./output/get-filters");

var _getAssets = require("./output/get-assets");

var _toAssetsUuid = require("./output/to-assets-uuid");

var _replaceAssets = require("./output/replace-assets");

var _constants = require("./constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function nunjucksLoader(source) {
  const isWindows = process.platform === 'win32';
  const callback = this.async();
  const options = (0, _getLoaderOptions.getLoaderOptions)(this, callback);
  const normalizedSearchPaths = [].concat(options.searchPaths).map(_path.default.normalize);
  let resourcePathImport = (0, _getImportPath.getImportPath)(this.resourcePath, normalizedSearchPaths);

  if (isWindows) {
    resourcePathImport = resourcePathImport.replace(/\\/g, '/');
  }

  (0, _getDependencies.getDependencies)(resourcePathImport, source, { ...options,
    searchPaths: normalizedSearchPaths
  }).then(({
    assets,
    dependencies,
    precompiled,
    globals,
    extensions,
    filters
  }) => {
    const hasAssets = Object.keys(assets).length > 0;
    const assetsUUID = (0, _toAssetsUuid.toAssetsUUID)(assets);
    const {
      imports: globalsImports
    } = (0, _getGlobals.getGlobals)(globals.concat(hasAssets ? [['static', _path.default.join(__dirname, './static.js')]] : []));
    const {
      imports: extensionsImports
    } = (0, _getExtensions.getExtensions)(extensions);
    const {
      imports: filtersImports
    } = (0, _getFilters.getFilters)(filters);
    const resourcePathString = JSON.stringify(resourcePathImport); // Only required options
    // https://mozilla.github.io/nunjucks/api.html#constructor

    const envOptions = JSON.stringify({
      autoescape: options.autoescape,
      throwOnUndefined: options.throwOnUndefined,
      trimBlocks: options.trimBlocks,
      lstripBlocks: options.lstripBlocks,
      // Loader specific options
      jinjaCompat: options.jinjaCompat,
      isWindows
    });

    /********************* */
    // DARVIN MODIFICATION
    /********************* */

    // force reload
    if(cacheRegister[resourcePathString]) {
      if(cacheRegister[resourcePathString] !== crypto.createHash('md5').update(source).digest("hex") && devServer.server) {
        if(devServer.app === 'bs') {
          // force browsersync reload
          devServer.server.reload(resourcePathString);
        } else {
          // force webpack devserver reload
          devServer.server.sockWrite(devServer.server.sockets, 'content-changed');
        }
      }
    }

    cacheRegister[resourcePathString] = crypto.createHash('md5').update(source).digest("hex");

    // ******************** */

    callback(null, `
            ${(0, _getRuntimeImport.getRuntimeImport)(this)}
            ${(0, _getTemplateDependenciesImport.getTemplateDependenciesImport)(this, dependencies)}
            ${globalsImports(this)}
            ${extensionsImports(this)}
            ${filtersImports(this)}
            ${(0, _getAssets.getAssets)(assetsUUID).imports(this)}
            ${(0, _replaceAssets.replaceAssets)(precompiled, assetsUUID)}

            exports = module.exports = function nunjucksTemplate(ctx) {
              var nunjucks = runtime(
                ${envOptions},
                __nunjucks_module_dependencies__
              );

              if (nunjucks.isAsync()) {
                return new Promise(function(resolve, reject) {
                  nunjucks.render(${resourcePathString}, ctx, function(err, res) {
                    if (err) {
                      return reject(err);
                    }

                    resolve(res);
                  });
                });
              }

              return nunjucks.render(${resourcePathString}, ctx);
            };

            exports.__nunjucks_precompiled_template__ = __nunjucks_module_dependencies__.templates[${resourcePathString}];
            exports.__nunjucks_module_dependencies__ = __nunjucks_module_dependencies__;
        `);
  }, function (error) {
    if (error.code === _constants.ERROR_MODULE_NOT_FOUND && error.message.includes("'glob'")) {
      return callback(new Error('Attempt to use dynamic assets ' + 'without optional "glob" dependency installed'));
    }

    callback(error);
  });
}
