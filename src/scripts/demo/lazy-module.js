import createModule from '@scripts/libs/create-module';

export default createModule({
  options: () => ({
    foo: 'bar',
  }),

  /**
   * createVueModule
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }) {
    // eslint-disable-next-line
    el.innerHTML = 'this is lazy initiated by IntersectionObserver; ' + options.foo;

    return state;
  },
});
