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

  let loaderPath = this.resourcePath.split('src/templates/')[1],
      loaderPathRel = loaderPath.substring(0, loaderPath.lastIndexOf("/")),
      callback = this.async(),
      opt = utils.parseQuery(this.query),
      twigSearchPaths = opt.searchPaths,
      twigNamespaces = opt.namespaces;

  if(loaderPathRel === '') {
    loaderPathRel = '/';
  }

  let loader,
      html,
      twigContext = opt.context,
      darvin = {},
      twing,
      dependencies;

  // bind specific template param context
  twigContext.forEach((template) => {
    if (template.options.templateParameters.darvin.path === loaderPathRel) {
      darvin = template.options.templateParameters.darvin;
    }
  });

  // eslint-disable-next-line no-useless-escape
  darvin.filepath = loaderPath.replace(/^.*[\\\/]/, '').replace('.twig', ''); // remove file extension

  dependencies = await addDependencies(loaderPath, this, twigNamespaces);

  loader = new TwingLoaderFilesystem([twigSearchPaths]);

  // define namespaces
  Object.keys(twigNamespaces).forEach((key, value) => {
    loader.addPath(twigNamespaces[key], key);
  })

  twing = new TwingEnvironment(loader, {strict_variables: false, debug: true, auto_reload: true, cache: false /*path.join(process.cwd(), '/tmp/cache/twing')*/});

  // debug flag
  twing.addExtension(new TwingExtensionDebug());

  /* darvin ==>
    {
      id: '9a5315cd2df3770ac151769cc6eb8c75',
      name: 'm04-manual',
      type: 'modules',
      chunkName: 'scripts/main',
      template: 'src/templates/modules/m04-manual/m04-manual.twig',
      templateRel: 'modules/m04-manual/m04-manual.twig',
      target: 'modules/m04-manual/m04-manual.html',
      path: 'modules/m04-manual',
      previews: [
        'm04-manual.preview.1',
        'm04-manual.preview.2',
        'm04-manual.preview.3',
        'm04-manual.preview.4'
      ],
      variants: 4,
      server: { base: '', assets: 'assets' },
      env: 'darvinrc.modern',
      mode: 'dev',
      config: { flag: false, design: '#', jira: '#', confluence: '#' },
      filepath: 'm04-manual.preview.3'
    }
  */
  twing.addGlobal("darvin", darvin);
  twing.addGlobal("sprite", twigContext.sprite);
  twing.addFilter(filter)

  html = twing.render(loaderPath, twigContext);

  callback(null, html);
};
