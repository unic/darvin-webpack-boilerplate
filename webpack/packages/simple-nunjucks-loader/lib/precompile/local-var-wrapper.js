"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.localVarWrapper = localVarWrapper;

/**
 * @typedef {Object} NunjucksPrecompiled
 * @property {string} name
 * @property {string} template
 */

/**
 * @param {NunjucksPrecompiled[]} templates
 * @returns {string}
 */
function localVarWrapper(templates) {
  let out = '';

  for (let i = 0; i < templates.length; i++) {
    const {
      name,
      template
    } = templates[i];
    out += `
            __nunjucks_module_dependencies__.templates[${JSON.stringify(name)}] = (function() {
                ${template}
            })();
        `;
  }

  return out;
}