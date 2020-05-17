const ROOT_PATH = process.cwd();
const htmlTemplates = require('../../libs/html-templates');

const prod = {
  module: {
    rules: [
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: [
                `${ROOT_PATH}/${global.inputDirs.src}/${global.inputDirs.templates}/`,
              ],
              assetsPaths: [
                `${ROOT_PATH}/${global.inputDirs.src}/${global.inputDirs.assets}/`,
              ],
              filters: {
                sizes: `${ROOT_PATH}/webpack/settings/html-njk/config/nunjucks.filters.size.js`,
              },
              globals: {
                darvinEnv: `${ROOT_PATH}/webpack/settings/html-njk/config/nunjucks.global.js`,
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...htmlTemplates.templates()
  ],
};

const dev = {
  module: {
    rules: [
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: [
                `${ROOT_PATH}/${global.inputDirs.src}/${global.inputDirs.templates}/`,
              ],
              assetsPaths: [
                `${ROOT_PATH}/${global.inputDirs.src}/${global.inputDirs.assets}/`,
              ],
              filters: {
                sizes: `${ROOT_PATH}/webpack/settings/html-njk/config/nunjucks.filters.size.js`,
              },
              globals: {
                darvinEnv: `${ROOT_PATH}/webpack/settings/html-njk/config/nunjucks.global.js`,
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    ...htmlTemplates.templates()
  ],
};

module.exports = {
  prod: prod,
  dev: dev
};
