/* eslint-disable */

"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");


var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _require = require('nunjucks'),
    Template = _require.Template;

var promisify = require('pify'); // returns a wrapped version of Environment#getTemplate which appends the
// dependencies discovered during the course of its run (which may make nested
// calls to `getTemplate`) to the supplied array.
//
// before:
//
//    getTemplate (name, parent, data) {
//        const template = this._resolveTemplate(name, parent)
//        return template.render(data)
//    }
//
// after:
//
//    const dependencies = []
//
//    getTemplate (name, parent, data) {
//        const template = this._resolveTemplate(name, parent)
//        const result = template.render(data)
//        dependencies.push({ name, parent, path: result.path })
//        return result
//    }


function wrapGetTemplate(env, dependencies) {
  var oldGetTemplate = env.getTemplate; // XXX everything here apart from the dependency signal is copypasta from
  // nunjucks.Environment (v3.x) and can go away if/when this data is exposed
  // by nunjucks e.g. via an event emitter:
  //
  // https://github.com/mozilla/nunjucks/issues/1153

  return function getTemplate() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var name = args[0],
        eagerCompile = args[1],
        parent = args[2],
        ignoreMissing = args[3],
        cb = args[4];
    var replace = 4;

    if (name && name.raw) {
      name = name.raw;
    }

    if (typeof parent === 'function') {
      cb = parent;
      parent = null;
      replace = 2;
    }

    if (typeof eagerCompile === 'function') {
      cb = eagerCompile;
      replace = 1;
    }

    if (cb) {
      var originalCallback = cb;

      var wrapper = function wrapper(err, result) {
        if (!err) {
          dependencies.push({
            name: name,
            parent: parent || null,
            path: result.path
          });
        }

        return originalCallback(err, result);
      };

      args[replace] = wrapper;
    }

    var result = oldGetTemplate.apply(this, args);

    if (!cb) {
      dependencies.push({
        name: name,
        parent: parent || null,
        path: result.path
      });
    }

    return result;
  };
} // a version of Environment#render which is (always) async and which
// is passed the data via an options object


function renderFile(_x, _x2, _x3) {
  return _renderFile.apply(this, arguments);
} // a version of Environment#renderString which is (always) async and which
// is passed the data and path via an options object


function _renderFile() {
  _renderFile = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(env, templatePath, _options) {
    var options, getTemplate, template, render;
    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _options || {};
            getTemplate = promisify(env.getTemplate.bind(env));
            _context.next = 4;
            return getTemplate(templatePath);

          case 4:
            template = _context.sent;
            render = promisify(template.render.bind(template));
            return _context.abrupt("return", render(options.data));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _renderFile.apply(this, arguments);
}

function renderString(env, src, _options) {
  var options = _options || {};
  var template = new Template(src, env, options.path);
  var render = promisify(template.render.bind(template));
  return render(options.data);
}

// `parseFile` and `parseString` are versions of `Environment#render` and
// `Environment#renderString`, respectively, which augment their results with an
// array of the transitive dependencies (templates) discovered during the course
// of their execution
//
// the underlying method in the `render` functions is Environment#getTemplate,
// which is called explicitly by `renderFile`, but also from generated/compiled
// code in nested templates.
//
// calls to `getTemplate` can be executed concurrently (i.e. interleaved)
// e.g. while one call is waiting for a network resource, another
// can run and return immediately with a precompiled result. this means
// we can't use the start and end of the method call to delimit its
// execution: other invocations of the method may happen during that window.
//
// for the same reason, the state can't be a property of the Environment
// instance, i.e. of `this`, since that state is shared across multiple
// invocations.
//
// one way to scope state to a method call is to pass the state
// into and down from the call as a parameter e.g.:
//
//    getTemplate (state, name, parent, data) {
//        const template = this._resolveTemplate(name)
//        const result = template.render(state, data)
//        state.dependencies.push({ name, parent, path: template.path })
//        return result
//    }
//
//    const state = { dependencies: [] }
//    const result = env.getTemplate(state, name, parent, data)
//    console.log(state.dependencies)
//
// this works, but, is hugely disruptive, requiring changes not only to the
// signature and internals of `getTemplate` but to any method it calls that
// might lead to a nested `getTemplate` call. this solution is particularly
// impractical for nunjucks since these calls may be baked into compiled code.
// which can't be "upgraded" to support a new protocol for "thread local"
// (i.e. per method-call) state.
//
// a better solution is to avoid concurrency/mutation altogether. we can do
// this by creating a private clone of the Environment and calling `getTemplate`
// on that. because it's private, nothing in the outside world can access or
// mutate it. because it's a clone, it won't modify anything in the outside
// world.
//
//    const dependencies = []
//    const clone = env.clone()
//    clone.getTemplate = wrapGetTemplate(env, dependencies)
//    const result = clone.getTemplate(name, parent, data)
//    console.log(dependencies)
//
// the "viral" nature of the hidden `this` parameter means the clone will
// get passed down to nested `getTemplate` calls, which is just what we
// want: things outside the bubble of encapsulation stay outside and things
// inside the bubble stay inside.
//
// the only drawback with this approach is that we lose things from the original
// env that we don't need to jettison. in order to harvest dependencies,
// the only things we need to override are `getTemplate` and caching.
// everything else can be delegated to the original env.
//
// this suggests that we don't need an Environment#clone method after all
// (which is just as well since nunjucks doesn't provide one — yet [1]). Our
// temporary env is not so much a clone as a *shim*, an object that delegates
// almost everything to its target. as of ES6, we have a built-in way to create
// shims like this quickly and easily without waiting for a library to bless us
// with a (potentially much heavier) `clone` implementation:
//
//    const dependencies = []
//    const shim = new Proxy(env, {})
//    shim.getTemplate = wrapGetTemplate(env, dependencies)
//    const result = shim.getTemplate(name, parent, data)
//    return { result, dependencies }
//
// this technique also scales well if the implementation changes e.g. it's easy
// to collect dependencies emitted via an event emitter [2] by replacing the
// shim's `getTemplate` override with an `emit` override
//
// [1] https://github.com/mozilla/nunjucks/pull/897
// [2] https://github.com/mozilla/nunjucks/issues/1153
// a private helper implementing code common to `parseFile` and `parseString`


function parse(_x4, _x5, _x6, _x7) {
  return _parse.apply(this, arguments);
} // an enhanced version of `renderFile` which augments its result with an array
// of the template's dependencies


function _parse() {
  _parse = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee2(env, render, pathOrSource, _options) {
    var options, dependencies, getTemplate, fakeLoaders, shim, content;
    return _regenerator.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            options = _options || {};
            dependencies = [];
            getTemplate = wrapGetTemplate(env, dependencies); // we need to disable caching (thread-locally) in order to traverse all of
            // the descendant files.

            fakeLoaders = env.loaders.map(function (loader) {
              // despite environments having a noCache option, it's effectively ignored
              // in nunjucks, and all cache operations are performed by reading from
              // and writing to env.loader[*].cache. by intercepting this value, we can
              // return false for all cache probes, ensuring dynamic dependencies
              // are always reached
              return new Proxy(loader, {
                get: function get(target, name, receiver) {
                  return name === 'cache' ? {} : Reflect.get(target, name, receiver);
                }
              });
            }); // override `getTemplate` and inject the wrappers we use to (thread-locally)
            // clear the loaders' caches

            shim = new Proxy(env, {
              get: function get(target, name, receiver) {
                if (name === 'getTemplate') {
                  return getTemplate;
                } else if (name === 'loaders') {
                  return fakeLoaders;
                } else {
                  var result = Reflect.get(target, name, receiver);
                  return result === target ? receiver : result;
                }
              }
            });
            _context2.next = 7;
            return render(shim, pathOrSource, options || {});

          case 7:
            content = _context2.sent;
            return _context2.abrupt("return", {
              content: content,
              dependencies: dependencies
            });

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _parse.apply(this, arguments);
}

function parseFile(env, templatePath, options) {
  return parse(env, renderFile, templatePath, options);
} // an enhanced version of `renderString` which augments its result with an array
// of the template's dependencies


function parseString(env, src, options) {
  return parse(env, renderString, src, options);
}

module.exports = {
  parseFile: parseFile,
  parseString: parseString,
  renderFile: renderFile,
  renderString: renderString
};
