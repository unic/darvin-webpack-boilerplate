import loadPolyfills from '../helpers/polyfills';

/**
 * createApp
 * @param {Object} config -
 * @param {Object} config.modules -
 * @return {Object} -
 */
export default ({ modules = {} } = {}) => {
  const state = {
    modules: {},
  };

  /* --- Private methods --- */

  /**
   * loadModule
   * @param {Object} module - Module to load
   * @return {Promise<void>} Resolved when loaded
   */
  const loadModule = (module) => {
    const queue = [];

    if (module.features) {
      queue.push(loadPolyfills(module.features));
    }

    if (module.handler instanceof Function) {
      queue.push(module.handler().then((esModule) => {
        // eslint-disable-next-line no-param-reassign
        module.handler = esModule.default;
      }));
    }

    return Promise.all(queue);
  };

  /**
   * createModuleInstance
   * @param {Object} module -
   * @param {HTMLElement} el -
   * @return {undefined} -
   */
  const createModuleInstance = (module, el) => {
    const options = el.getAttribute(`data-${module.name}-options`);
    const instance = module.handler.createInstance({
      el,
      options: options ? JSON.parse(options) : {},
    });

    // Save newly created instance
    module.instances.push({ el, name: module.name, instance });
  };

  /**
   * createIntersectionObserver
   * @param {Object} module -
   * @return {IntersectionObserver} intersectionObserver
   */
  const createIntersectionObserver = (module) => {
    const config = {
      rootMargin: '500px 0px 500px', // Extends IntersectionObserver by 500px on top and on bottom of viewport
      threshold: 0.01,
    };

    const observer = new IntersectionObserver(async (entries) => {
      const elements = entries.filter(entry => entry.intersectionRatio >= 0.01);

      if (elements.length) {
        await loadModule(module);

        elements.forEach((entry) => {
          createModuleInstance(module, entry.target);
          observer.unobserve(entry.target);
        });
      }
    }, config);

    return observer;
  };

  /* --- Public methods --- */

  /**
   * registerModule
   * @param {String} name - Name of the registered module
   * @param {Object|Function} module - Dynamic import of the module, or module itself
   * @return {Boolean} -
   */
  state.registerModule = (name, module) => {
    const selector = `[data-module~="${name}"]`;

    state.modules[name] = {
      name,
      selector,
      lazy: !!module.lazy, // Assign lazy when module should be lazy-initiated
      features: module.features,

      // Assign actual handler when provided an object with lazy prop
      handler: module.handler ? module.handler : module,
      instances: [],

      /**
       * init
       * @param {Document|HTMLElement} scope - Scope of the module that should be initiated.
       * @return {Promise} -
       */
      async init(scope = document) {
        let elements;

        if (scope === document) {
          elements = scope.querySelectorAll(this.selector);
        } else {
          elements = scope.parentNode.querySelectorAll(this.selector);
        }

        if (elements.length) {
          if (this.lazy) {
            if (!this.intersectionObserver) {
              // Creating a scoped IntersectionObserver for this module
              this.intersectionObserver = createIntersectionObserver(this);
            }

            elements.forEach((el) => {
              this.intersectionObserver.observe(el);
            });
          } else {
            await loadModule(this);

            elements.forEach((el) => {
              createModuleInstance(this, el);
            });
          }
        }
      },
    };
  };

  state.registerModules = (modules_) => {
    Object.entries(modules_).forEach(([name, module]) => {
      state.registerModule(name, module);
    });
  };

  state.initModule = (name, scope = document) => {
    if (!state.modules[name]) {
      throw new Error(`The module '${name}' is not registered.`);
    }
    state.modules[name].init(scope);
  };

  state.initAllModules = () => {
    Object.keys(state.modules).forEach((name) => {
      state.initModule(name);
    });
  };

  /**
   * getModuleInstancesByElement
   * by providing an HTMLElement we search for modules hooked over this node
   * @param {HTMLElement} element -
   * @param {String} [moduleName] -
   * @return {Array} -
   */
  state.getModuleInstancesByElement = (element, moduleName) => {
    if (moduleName) {
      return state.modules[moduleName].instances.filter(mi => mi.el === element);
    }

    return Object.entries(state.modules).reduce((acc, [, module]) => {
      acc.push(...module.instances.filter(mi => mi.el === element));
      return acc;
    }, []);
  };

  /**
   * init
   * @return {undefined}
   */
  state.init = async () => {
    await loadPolyfills(['IntersectionObserver']);

    state.registerModules(modules);
    state.initAllModules();
  };

  state.init();

  return state;
};
