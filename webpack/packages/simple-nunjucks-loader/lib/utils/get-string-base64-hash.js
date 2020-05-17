"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getStringBas64Hash = getStringBas64Hash;

/* eslint-env node */

/**
 * @link https://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 * @param str
 * @returns {*}
 */
function getStringHash(str) {
  let hash = 0;

  if (str.length === 0) {
    return hash;
  }

  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash = hash & hash;
  }

  return hash;
}

function getStringBas64Hash(str) {
  return Buffer.from(String(getStringHash(str))).toString('base64');
}