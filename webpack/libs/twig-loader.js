/* eslint-disable */
const utils = require('loader-utils');

const { addDependencies } = require('../helpers/twig-helpers');
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing');

module.exports = async function(content) {
  this.cacheable();

  const loaderPath = this.resourcePath.split('src/templates/')[1],
        loaderPathRel = loaderPath.substring(0, loaderPath.lastIndexOf("/")),
        callback = this.async(),
        opt = utils.parseQuery(this.query),
        twigSearchPaths = opt.searchPaths,
        twigNamespaces = opt.namespaces;

  let loader,
      html,
      nunjucksContext = opt.context,
      darvin = {},
      twing,
      dependencies;

  // bind specific template param context
  nunjucksContext.templates.forEach((templates) => {
    if (templates.options.templateParameters.path === loaderPathRel) {
      darvin = templates.options.templateParameters;
    }
  });

  // eslint-disable-next-line no-useless-escape
  darvin.filepath = loaderPath.replace(/^.*[\\\/]/, '').replace('.twig', ''); // remove file extension
  darvin.config = global;

  /*
  // Load as array
  let loadingObj = {};
  loadingObj[loaderPath] = content;
  loader = new TwingLoaderArray(loadingObj);
  */

  dependencies = await addDependencies(loaderPath, this, twigNamespaces);

  loader = new TwingLoaderFilesystem([twigSearchPaths]);

  // define namespaces
  Object.keys(twigNamespaces).forEach((key, value) => {
    loader.addPath(twigNamespaces[key], key);
  })

  twing = new TwingEnvironment(loader, {strict_variables: false, debug: false, auto_reload: true});

  // debug flag
  // twing.addExtension(new TwingExtensionDebug());

  twing.addGlobal("darvin", darvin);

  html = twing.render(loaderPath, nunjucksContext);

  callback(null, html);
};
