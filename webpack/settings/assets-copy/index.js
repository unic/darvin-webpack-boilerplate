const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require("path");
const basePath = process.cwd();

const prod = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${basePath}/changelog.md`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/log/[name][ext]`;
          },
        },
        {
          from: `${basePath}/log/*.{md,json}`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/log/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/meta/**/*.{md,json}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/log/*.{md,json}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/modules/**/*.${global.template.extIn}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/components/**/*.${global.template.extIn}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/images/[name][ext]`;
          },
        },
    ]})
  ],
};

const dev = {
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: `${basePath}/changelog.md`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/log/[name][ext]`;
          },
        },
        {
          from: `${basePath}/log/*.{md,json}`,
          noErrorOnMissing: true,
          to() {
            return `${global.server.assets}/log/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/meta/**/*.{md,json}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/**/log/*.{md,json}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/modules/**/*.${global.template.extIn}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.inputDirs.templates}/components/**/*.${global.template.extIn}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/static/${absoluteFilename.split(`/${global.inputDirs.src}/${global.inputDirs.templates}/`)[1]}`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/renditions/**/*.{png,gif,jpg,svg}`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/images/[name][ext]`;
          },
        },
        {
          from: `${basePath}/${global.inputDirs.src}/${global.server.assets}/images/favicons/favicon-dev.ico`,
          noErrorOnMissing: true,
          to({ context, absoluteFilename }) {
            return `${global.server.assets}/[name][ext]`;
          },
        },
    ]})
  ],
};


module.exports = {
  prod: prod,
  dev: dev
};
