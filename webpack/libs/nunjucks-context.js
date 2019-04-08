/* eslint-disable */
const glob = require('glob');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

let { previewIndexObj, allIconsInDir } = require('./darvin-webpack'),
    htmlTemplates = [];


const dynamicSort = (property) => {
  var sortOrder = 1;
  if(property[0] === "-") {
      sortOrder = -1;
      property = property.substr(1);
  }
  return function (a,b) {
      var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
      return result * sortOrder;
  }
}

// iterate all elements and render previews
Object.keys(previewIndexObj.payload).forEach(function (key) {
  let items = previewIndexObj.payload[key];

  Object.keys(items).forEach(function (keyItem) {
    let elementObj = items[keyItem];

      elementObj.previews.forEach(function (preview) {
        let targetPath = `${elementObj.path}/${preview}`;

        let obj = new HtmlWebpackPlugin({
          filename: targetPath + `.html`,
          template: `${global.dirRoot}/${global.dirTemplate}/${targetPath}.${global.templateExt}`,
          hash: true,
          inject: 'body',
          cache: true,
          chunks: [elementObj.chunkName],
          templateParameters: elementObj
        });

        htmlTemplates.push(obj)
      })

  });
});

// add index
htmlTemplates.push(new HtmlWebpackPlugin({
  filename: `${global.prevIndexFileTarget}`,
  template: `${global.dirRoot}/${global.dirTemplate}/${global.prevIndexFile}`,
  hash: true,
  inject: `body`,
  cache: true,
  chunks: [`js/main`],
  templateParameters: {
    name: `${global.renderPath.index}`,
    type: `preview`,
    chunkName: `js/main`,
    template: `${global.dirRoot}/${global.dirTemplate}/${global.prevIndexFile}`,
    templateRel: `${global.prevIndexFile}`,
    target: `${global.prevIndexFileTarget}`,
    path: `/`,
    previews: `${global.renderPath.index}`,
    variants: 1
  }
}))

module.exports = {
  imageSrc: `/${global.serverAssets}/images/renditions/`,
  htmlTemplates: htmlTemplates, // nunjuck loader
  index: previewIndexObj, //  index generator
  sprite: allIconsInDir
};
