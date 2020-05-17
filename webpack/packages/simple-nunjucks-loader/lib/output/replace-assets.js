"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.replaceAssets = replaceAssets;

var _toRegexpSource = require("../utils/to-regexp-source");

var _assets = require("./assets");

function getAssetReplaceRegExp(path) {
  const isDynamicAsset = (0, _assets.isDynamicPath)(path);
  const reSource = isDynamicAsset ? (0, _toRegexpSource.toRegExpSource)(path).split(' \\+ ').map(function (part) {
    if (!part.startsWith('"')) {
      return '([^+]+)';
    }

    return part;
  }).join(' \\+ ') : (0, _toRegexpSource.toRegExpSource)(`"${path}"`);
  return new RegExp(reSource, 'g');
}

function replaceAssetPath(precompiled, [uuid, path]) {
  const re = getAssetReplaceRegExp(path);
  const argsCount = (0, _assets.getArgs)(path).length;
  return precompiled.replace(re, function (match, ...args) {
    const staticArgs = args.slice(0, argsCount);
    return [`_templateAssets['${uuid}']`, ...staticArgs].join();
  });
}

function replaceAssets(precompiled, assets) {
  if (assets.length === 0) {
    return precompiled;
  }

  return assets.reduce(function (precompiled, asset) {
    return replaceAssetPath(precompiled, asset);
  }, precompiled);
}