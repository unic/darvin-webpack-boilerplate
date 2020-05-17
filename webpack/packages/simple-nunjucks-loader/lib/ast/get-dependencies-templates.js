"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getDependenciesTemplates = getDependenciesTemplates;

var _nunjucks = _interopRequireDefault(require("nunjucks"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @param {nunjucks.nodes.Root} nodes
 * @returns {string[]|nunjucks.nodes.Node[]}
 */
function getDependenciesTemplates(nodes) {
  const extendsNodes = nodes.findAll(_nunjucks.default.nodes.Extends);
  const includeNodes = nodes.findAll(_nunjucks.default.nodes.Include);
  const importNodes = nodes.findAll(_nunjucks.default.nodes.Import);
  const fromImportNodes = nodes.findAll(_nunjucks.default.nodes.FromImport);
  return [...extendsNodes, ...includeNodes, ...importNodes, ...fromImportNodes].map(node => node.template.value);
}