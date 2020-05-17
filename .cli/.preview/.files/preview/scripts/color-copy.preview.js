/**
 * @file Darvin Copy Colors
 * @author Tobias Frei
 *
 * @module icon
 */

import createModule from '@scripts/libs/create-module';

export default createModule({
  options: () => ({
    container: '.darvin-prev-colors',
    icon: '.darvin-prev-flexgrid__colorbox'
  }),

  /**
   * createButton
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }) {
    let container,
        icons;

    // Private Functions
    const copyIcon = (e) => {
      var copyText = e.currentTarget.querySelector('input');
      copyText.select();
      document.execCommand("copy");
    };

    /* --- Public methods --- */

    /**
     * init
     * @return {undefined}
     */
    state.init = () => {
      container = el;
      if(!container) return;

      icons = document.querySelectorAll(options.icon);

      [...icons].forEach((icon) => {
        icon.addEventListener('click', copyIcon);
      });
    };

    state.init();

    return state;
  },
});
