/**
 * @author @@@authorName@@@
 *
 * @module @@@name@@@
 *
 */

import createModule from '@scripts/libs/create-module';
import BreakpointManager from '@scripts/helpers/breakpoint-manager';

export default createModule({
  options: () => ({
    myOption: 'small-device'
  }),

  /**
   * myModuleName
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }) {
    /* --- Private methods --- */
    let subscriptionId;

    /**
     * demo
     * do something
     */
    const something = () => {
      el.classList.add(options.myOption);
    };

    /**
     * breakpointChangeHandler
     * @return {undefined}
     */
    const breakpointChangeHandler = () => {
      requestAnimationFrame(() => {
        const breakpoint = BreakpointManager.getState().breakpoint.name;
        if (['micro', 'small', 'medium'].includes(breakpoint)) {
          something();
        }
      });
    };

    /* --- Public methods --- */

    /**
     * init
     * @return {undefined}
     */
    state.init = () => {
      subscriptionId = BreakpointManager.on('change', breakpointChangeHandler);
    };

    /**
     * destroy
     * @return {undefined}
     */
    state.destroy = () => {
      // Unsubscribe from breakpoint changes
      BreakpointManager.off(subscriptionId);
    };

    state.init();

    return state;
  },
});
