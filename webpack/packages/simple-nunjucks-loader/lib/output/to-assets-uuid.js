"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toAssetsUUID = toAssetsUUID;

var _getStringBase64Hash = require("../utils/get-string-base64-hash");

function toAssetsUUID(assets) {
  return assets.map(function ([assetPath, assetImport]) {
    return [(0, _getStringBase64Hash.getStringBas64Hash)(assetPath), assetPath, assetImport];
  });
}