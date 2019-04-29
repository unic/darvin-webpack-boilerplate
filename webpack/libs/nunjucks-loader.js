/* eslint-disable */

/**
* based on: https://github.com/ryanhornberger/nunjucks-html-loader
* bind specific context
* edit by Darvin
*/

const utils = require('loader-utils');
const fs = require('fs');
const path = require('path');
const nunjucks = require('nunjucks');
const crypto = require('crypto');

let devServer = require('./devserver-storage');
let cacheRegister = {};

const NunjucksLoader = nunjucks.Loader.extend({
  init(searchPaths, sourceFoundCallback) {
    this.sourceFoundCallback = sourceFoundCallback;

    if (searchPaths) {
      searchPaths = Array.isArray(searchPaths) ? searchPaths : [searchPaths];
      // For windows, convert to forward slashes
      this.searchPaths = searchPaths.map(path.normalize);
    } else {
      this.searchPaths = ['.'];
    }
  },

  getSource(name) {
    let fullpath = null;
    const paths = this.searchPaths;

    for (let i = 0; i < paths.length; i++) {
      const basePath = path.resolve(paths[i]);
      const p = path.resolve(paths[i], name);

      // Only allow the current directory and anything
      // underneath it to be searched
      if (p.indexOf(basePath) === 0 && fs.existsSync(p)) {
        fullpath = p;
        break;
      }
    }

    if (!fullpath) {
      return null;
    }

    this.sourceFoundCallback(fullpath);

    return {
      src: fs.readFileSync(fullpath, 'utf-8'),
      path: fullpath,
      noCache: false
    };
  },
});

module.exports = function(content) {
  this.cacheable();

  const loaderPath = this.resourcePath.split('src/templates/')[1],
        loaderPathRel = loaderPath.substring(0, loaderPath.lastIndexOf("/")),
        callback = this.async(),
        opt = utils.parseQuery(this.query),
        nunjucksSearchPaths = opt.searchPaths;

  let loader,
      nunjEnv,
      template,
      html,
      nunjucksContext = opt.context;

  let darvin = {};

  // bind specific template param context
  nunjucksContext.htmlTemplates.forEach((htmlTemplates) => {
    if (htmlTemplates.options.templateParameters.path === loaderPathRel) {
      darvin = htmlTemplates.options.templateParameters;
    }
  });

  // eslint-disable-next-line no-useless-escape
  darvin.filepath = loaderPath.replace(/^.*[\\\/]/, '').replace('.njk', ''); // remove file extension
  darvin.config = global;

  loader = new NunjucksLoader(nunjucksSearchPaths, ((filePath) => {
    this.addDependency(filePath);
  }));

  nunjEnv = new nunjucks.Environment(loader);
  nunjucks.configure(null, { watch: false });

  // add darvin global
  nunjEnv.addGlobal("darvin", darvin);

  template = nunjucks.compile(content, nunjEnv);
  html = template.render(nunjucksContext);

  // force reload
  if(cacheRegister[loaderPath]) {
    if(cacheRegister[loaderPath] !== crypto.createHash('md5').update(html).digest("hex")) {
      devServer.server.sockWrite(devServer.server.sockets, 'content-changed');
    }
  }

  cacheRegister[loaderPath] = crypto.createHash('md5').update(html).digest("hex");

  callback(null, html);
};
