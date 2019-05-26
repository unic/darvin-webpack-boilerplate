/**
 * createModule
 * @param {Object} config -
 * @return {Object} module
 */
export default config => ({
  createInstance: ({ el, options: options_ = {} }) => {
    const state = {};

    if (config.mixins) {
      Object.entries(config.mixins).forEach(([name, mixin]) => {
        // mixins are namespaced by name and prepended by a '$'
        // This is mainly to avoid naming-conflict
        state[`$${name}`] = mixin();
      });
    }

    const options = {};

    // Check if default options is a function and throw if it's defined but not as a function
    if (config.options && config.options instanceof Function) {
      Object.assign(options, config.options());
    } else if (config.options) {
      throw new Error('options must be a Function returning an object');
    }

    // Assign given options to overwrite default options
    Object.assign(options, options_);

    return config.constructor({
      el,
      state,
      options,
    });
  },
});
