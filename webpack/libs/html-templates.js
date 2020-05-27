const HtmlWebpackPlugin = require('html-webpack-plugin');

let { previewIndexObj, allIconsInDir } = require('./darvin-preview');

let templatesArr = [];

let templates = () => {
    return templatesArr;
};

const darvinParameters = {
  config: global,
  env: process.env.DARVIN_ENV,
  mode: process.env.NODE_ENV
};

// iterate elements and render previews
Object.keys(previewIndexObj.payload).forEach(key => {
  const items = previewIndexObj.payload[key];

  Object.keys(items).forEach(keyItem => {

    /* elementObj ==>
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
        config: { flag: false, design: '#', jira: '#', confluence: '#' }
      }
    */
    const elementObj = items[keyItem];

      elementObj.previews.forEach((preview, j) => {
        const elementObjClone = JSON.parse(JSON.stringify(elementObj));
        const targetPath = `${elementObj.path}/${preview}`;

        // add origin looped preview filename
        elementObjClone['filepath'] = preview;

        const obj = new HtmlWebpackPlugin({
          filename: targetPath + `.html`,
          template: `${global.inputDirs.src}/${global.inputDirs.templates}/${targetPath}.${global.template.extIn}`,
          hash: true,
          inject: `body`,
          cache: true,
          chunks: [elementObjClone.chunkName],
          templateParameters: {
            darvin: elementObjClone,
            sprite: allIconsInDir
          },
          minify: {
            collapseWhitespace: false,
            conservativeCollapse: false,
            removeComments: false,
            removeRedundantAttributes: false,
            removeScriptTypeAttributes: false,
            removeStyleLinkTypeAttributes: false,
            useShortDoctype: false,
            removeAttributeQuotes: false,
            removeEmptyAttributes: false,
            removeEmptyElements: false,
            removeOptionalTags: false
          }
        });

        templatesArr.push(obj);
      })
  });
});

// add index
templatesArr.push(new HtmlWebpackPlugin({
  filename: `${global.preview.indexFileOutput}`,
  template: `${global.inputDirs.src}/${global.inputDirs.templates}/${global.preview.indexFileInput}`,
  hash: false,
  inject: `body`,
  cache: true,
  chunks: [`scripts/main`],
  minify: {
    collapseWhitespace: false,
    conservativeCollapse: false,
    removeComments: false,
    removeRedundantAttributes: false,
    removeScriptTypeAttributes: false,
    removeStyleLinkTypeAttributes: false,
    useShortDoctype: false,
    removeAttributeQuotes: false,
    removeEmptyAttributes: false,
    removeEmptyElements: false,
    removeOptionalTags: false
  },
  templateParameters: {
    darvin: {
      name: `${global.output.index}`,
      type: `preview`,
      chunkName: `scripts/main`,
      template: `${global.inputDirs.src}/${global.inputDirs.templates}/${global.preview.indexFileInput}`,
      templateRel: `${global.preview.indexFileInput}`,
      target: `${global.preview.indexFileOutput}`,
      path: `/`,
      previews: `${global.output.index}`,
      variants: 1,
      index: previewIndexObj
    }
  }
}));

module.exports = {
  imageSrc: `/${global.server.assets}/images/renditions/`,
  templates: templates, // nunjuck loader
  index: previewIndexObj, //  index generator
  sprite: allIconsInDir
};
