/**
 * @author tobias.frei@unic.com
 *
 * @module darvin-manual
 *
 */

import { IModuleInstance } from '@scripts/models/models.d';
import createModule from '@scripts/libs/create-module';
// import pubsub from '@scripts/helpers/pubsub';
import helperDom from '@scripts/helpers/helper-dom';

export default createModule({
  options: () => ({
    attribute: {
      zone: 'data-test'
    },
    domSelectors: {
      section: '.doc-section'
    },
    offset: '-200px',
    threshold: '0',
  }),

  /**
   * myModuleName
   * @param {Object} module - Module
   * @param {Element} module.el - Element
   * @param {Object} module.state - State
   * @param {Object} module.options - Options
   * @return {Object} state
   */
  constructor({ el, state, options }): IModuleInstance {
    /* --- Private methods --- */
    let intersectionObserver: IntersectionObserver;

    const initIntersectionObserver = () => {
      const observerConfig = {
        rootMargin: options.offset,
        threshold: options.threshold,
      };

      intersectionObserver = helperDom.createIntersectionObserver(entry => {
        // const json = getOption(entry.target, options.attribute.zone);
        const activeNavItem: HTMLElement | null = document.querySelector(`.header__navitem .is-active`);
        const newNavItem: HTMLElement | null = document.querySelector(`.header__navitem [data-id="${entry.target.id}"]`);

        if (activeNavItem) {
          activeNavItem.classList.remove('is-active');
        }

        if (newNavItem) {
          newNavItem.classList.add('is-active');
        }
        // pubsub.trigger('sia.areaIntersection', json);
      }, false, observerConfig);

      state.ui.intersectionElements.forEach((section) => {
        intersectionObserver.observe(section);
      });
    };

    const destroyIntersectionObserver = () => {
      intersectionObserver.disconnect();
    };

    /* --- Public methods --- */

    /**
     * init
     * @return {undefined}
     */
    state.init = (): void => {
      state.ui = {
        intersectionElements: el.querySelectorAll(options.domSelectors.section)
      };

      initIntersectionObserver();
    };

    /**
     * destroy
     * @return {undefined}
     */
    state.destroy = (): void => {
      destroyIntersectionObserver();
    };

    state.init();

    return state;
  }
});
