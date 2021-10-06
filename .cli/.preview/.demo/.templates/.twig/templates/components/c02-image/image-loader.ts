/**
 * ImageLoader
 *
 * @description
 * This will create an ImageLoader instance as a singleton.
 * Will also add custom hooks to enable fade in animations
 *
 * @type Singleton
 *
 * @author Christian Sany
 * @copyright Unic AG
 */

import * as fastdom from 'fastdom';
import objectFitImages from 'object-fit-images';
import loadPolyfills from '@scripts/helpers/polyfills';
import createImageLoader from '@scripts/libs/create-image-loader';
import {ImageConfig} from '@scripts/models/models';

let instance;

const config: ImageConfig = {
  domSelectors: {
    moduleRoot: '.c-image',
  },
  stateClasses: {
    prepareLoading: 'enter-prepare',
    loading: 'enter-active',
  },
  hooks: undefined
};

/**
 * onBeforeLoad
 * @param {HTMLImageElement} image - Observed image
 * @return {Promise} - Resolves into next frame after async work is done
 */
const onBeforeLoad = (image: HTMLImageElement) => new Promise((resolve) => {
  fastdom.mutate(() => {
    const root = image.closest(config.domSelectors.moduleRoot);
    if (root) {
      root.classList.add(config.stateClasses.prepareLoading);
    }
    fastdom.measure(() => resolve);
  });
});

/**
 * onLoad
 * @param {HTMLImageElement} image - Observed image
 * @return {Promise} - Resolves into next frame after async work is done
 */
const onLoad = async (image: HTMLImageElement) => new Promise((resolve) => {
  const wrapper = image.closest(config.domSelectors.moduleRoot);

  // Add one time listener for transitionend
  image.addEventListener('transitionend', function transitionendListener() {
    // Remove one time listener
    image.removeEventListener('transitionend', transitionendListener);
    fastdom.mutate(() => {
      // Remove animation class
      if (wrapper) {
        wrapper.classList.remove(config.stateClasses.loading);
      }
    });
  });

  fastdom.mutate(async () => {
    if (wrapper) {
      wrapper.classList.add(config.stateClasses.loading);
      wrapper.classList.remove(config.stateClasses.prepareLoading);
    }

    if (image.parentNode && (<HTMLElement>image.parentNode).tagName === 'PICTURE') {
      const [picturefill] = await loadPolyfills(['picture']);
      if (picturefill) {
        picturefill({
          reevaluate: true,
          elements: [image.parentNode],
        });
      }
    }

    objectFitImages(image); // Trigger object fit polyfill for images for IE11
    fastdom.measure(() => resolve);
  });
});

// Add callbacks to the config
config.hooks = {
  onBeforeLoad,
  onLoad,
};

export default {
  /**
   * getInstance
   * creates ImageLoader if doesn't exist, or returns immediatly when already existing
   * @return {Object} - ImageLoader
   */
  getInstance() {
    if (!instance) {
      instance = createImageLoader({config, state: {}});
    }
    return instance;
  },
};
