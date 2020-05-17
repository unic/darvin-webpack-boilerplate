"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.precompileToLocalVar = precompileToLocalVar;

var _nunjucks = _interopRequireDefault(require("nunjucks"));

var _localVarWrapper = require("./local-var-wrapper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {string}      source
 * @param {string}      fileName
 * @param {Environment} env
 * @returns {Promise<string>}
 */
function precompileToLocalVar(source, fileName, env) {
  return new Promise(function (resolve, reject) {
    try {
      const precompiled = _nunjucks.default.precompileString(source, {
        env,
        name: fileName,
        wrapper: _localVarWrapper.localVarWrapper
      });

      resolve(precompiled);
    } catch (e) {
      reject(e);
    }
  });
}