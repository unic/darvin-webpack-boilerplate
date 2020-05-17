"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getUsedGlobals = getUsedGlobals;

var _getUsagesOf = require("./get-usages-of");

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {nunjucks.nodes.Root}     nodes
 * @param {Object.<string, string>} globals
 * @returns {string[]}
 */
function getUsedGlobals(nodes, globals) {
  return (0, _getUsagesOf.getUsagesOf)(_nunjucks.default.nodes.FunCall, nodes)(Object.entries(globals), ({
    name: globalName
  }) => ([name]) => globalName.value === name);
}