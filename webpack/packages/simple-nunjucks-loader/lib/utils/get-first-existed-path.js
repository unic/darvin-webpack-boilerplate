"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirstExistedPath = getFirstExistedPath;

var _fs = _interopRequireDefault(require("fs"));

var _util = require("util");

var _getGlob = require("./get-glob");

var _unquote = require("./unquote");

var _getErrorCopy = require("./get-error-copy");

var _constants = require("../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const fsAccess = (0, _util.promisify)(_fs.default.access);

function isExists(path) {
  if (isExpression(path)) {
    return (0, _getGlob.getGlob)().then(function (glob) {
      return new Promise(function (resolve, reject) {
        glob(getGlobExpression(path), function (err, files) {
          if (err) {
            return reject(err);
          }

          resolve(files.length > 0);
        });
      });
    });
  }

  return fsAccess(path);
}

function isExpression(str) {
  return /" \+ [^ ]+( \+ "|$)/.test(str);
}

function getGlobExpression(pathExpression) {
  return (0, _unquote.unquote)(pathExpression.replace(/" \+ [^ ]+( \+ "|$)/g, '*'));
}

function getFirstExistedPath(paths) {
  return paths.reduce(function (resolved, path) {
    return resolved.then(function (existedFile) {
      if (typeof existedFile === 'string') {
        return existedFile;
      }

      return isExists(path).then(() => path, error => {
        if (error.code !== _constants.ERROR_MODULE_NOT_FOUND) {
          return false;
        }

        throw (0, _getErrorCopy.getErrorCopy)(error);
      });
    });
  }, Promise.resolve()).then(function (path) {
    if (typeof path !== 'string') {
      throw new Error('Template not found');
    }

    return path;
  });
}