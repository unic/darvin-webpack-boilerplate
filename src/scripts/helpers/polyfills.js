/**
 * Polyfills to be loaded by default
 *
 * Small polyfills we are being inlined
 * Larger ones are loaded async and only if needed
 *
 * If a polyfill is expected to be used only in exceptional cases it could make sense to load it
 * where needed instead of here
 *
 * !IMPORTANT! Check with core-js to see which polyfills are included for you
 * automatically with @babel/preset-env
 * Website: https://www.npmjs.com/package/core-js
 */

/**
 * loadPolyfills
 * Tests for surtain functionality and adds polyfills when functionality is not found
 * @param {Array} polyfills - Which polyfills to load. Leave empty to load all
 * @return {Promise} - Resolves when all async polyfills are loaded
 */
export default function loadPolyfills(polyfills = []) {
  const requiredPolyfills = [];

  if (!window.fetch && (!polyfills.length || polyfills.includes('fetch'))) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-fetch" */ 'whatwg-fetch'));
  }

  if (!window.IntersectionObserver && (!polyfills.length || polyfills.includes('IntersectionObserver'))) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-intersection-observer" */ 'intersection-observer').then(() => {
      // Enables polling to fix further bugs on IE11
      // 1000ms is fast enough for edge cases that need this configuration, has no type library for typescript
      IntersectionObserver.prototype.POLL_INTERVAL = 1000;
    }));
  }

  if (!window.HTMLPictureElement && (!polyfills.length || polyfills.includes('picture'))) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-picturefill" */ 'picturefill').then(({default: picturefill}) => {
      picturefill(); // Execute picturefill
      return picturefill;
    }));
  }

  if (!Array.prototype.forEach) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-nodelist" */ 'mdn-polyfills/NodeList.prototype.forEach'));
  }

  if (!Element.prototype.closest) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-closest" */ 'mdn-polyfills/Element.prototype.closest'));
  }

  if (!Element.prototype.matches) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-matches" */ 'mdn-polyfills/Element.prototype.matches'));
  }

  if (!window.CustomEvent) {
    requiredPolyfills.push(import(/* webpackChunkName: "polyfill-nodelist" */ 'mdn-polyfills/CustomEvent'));
  }

  return Promise.all(requiredPolyfills);
}
