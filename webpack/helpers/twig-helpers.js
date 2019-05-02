/* eslint-disable */
const TwigDeps = require('twig-deps');

const addDependencies = async (entry, that, ns) => {
  entry = process.cwd() + '/src/templates/' + entry;

  var depper = new TwigDeps({
    namespaces: ns
  });

  depper.on('data', (dependency) => {
    that.addDependency(dependency);
  });

  depper.on('missing', (dependency) => {
    console.error("DV.Twig >> missing dependency");
    console.log(dependency);
  });

  depper.on('error', (error) => {
    console.error("DV.Twig >> error dependency");
    console.log(error);
  });

  depper.end(entry);
};

module.exports = {
  addDependencies: addDependencies
};
