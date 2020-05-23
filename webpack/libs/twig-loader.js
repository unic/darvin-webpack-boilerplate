const ROOT_PATH = process.cwd();
const utils = require('loader-utils');
const path = require('path');

const filterSize = require(`${ROOT_PATH}/webpack/settings/html-twig/config/twig.filters.size.js`);

const { addDependencies } = require('../helpers/twig-helpers');
const {TwingEnvironment, TwingLoaderFilesystem, TwingFilter, TwingExtensionDebug} = require('twing');

// apply filters here
const filter = new TwingFilter('size', filterSize);

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
      twigContext = opt.context,
      darvin = {},
      twing,
      dependencies;

  // bind specific template param context
  twigContext.forEach((template) => {
    if (template.options.templateParameters.path === loaderPathRel) {
      darvin = template.options.templateParameters;
    }
  });

  // eslint-disable-next-line no-useless-escape
  darvin.filepath = loaderPath.replace(/^.*[\\\/]/, '').replace('.twig', ''); // remove file extension
  darvin.config = global;

  dependencies = await addDependencies(loaderPath, this, twigNamespaces);

  loader = new TwingLoaderFilesystem([twigSearchPaths]);

  // define namespaces
  Object.keys(twigNamespaces).forEach((key, value) => {
    loader.addPath(twigNamespaces[key], key);
  })

  twing = new TwingEnvironment(loader, {strict_variables: false, debug: true, auto_reload: true, cache: false /*path.join(process.cwd(), '/tmp/cache/twing')*/});

  twing.addExtension(new TwingExtensionDebug());

  // debug flag
  twing.addGlobal("darvin", darvin);
  twing.addGlobal("sprite", twigContext.sprite);
  twing.addFilter(filter)

  html = twing.render(loaderPath, twigContext);

  callback(null, html);
};
