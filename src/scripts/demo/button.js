import createModule from '@scripts/libs/create-module';

export default createModule({
  options: () => ({
    foo: 'bar',
  }),

  /**
   * createButton
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state }) {
    /* --- Private methods --- */

    /**
     * clickHandler
     * @param {Event} event - Native Event
     * @return {undefined}
     */
    const clickHandler = () => {
      // Yout custom logic here
    };
    /**
     * addEventListeners
     * @return {undefined}
     */
    const addEventListeners = () => {
      el.addEventListener('click', clickHandler);
    };

    /**
     * removeEventListeners
     * @return {undefined}
     */
    const removeEventListeners = () => {
      el.removeEventListener('click', clickHandler);
    };

    /* --- Public methods --- */

    /**
     * init
     * @return {undefined}
     */
    state.init = () => {
      addEventListeners();

      // console.log('**************** module init ****************');
      // console.log('el', el);
      // console.log('state', state);
      // console.log('options', options);
    };

    /**
     * destroy
     * @return {undefined}
     */
    state.destroy = () => {
      removeEventListeners();
    };

    state.init();

    return state;
  },
});
