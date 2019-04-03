/**
 * @author @@@authorEmail@@@
 *
 * @module @@@name@@@
 *
 */

const instance = {};

const defaults = {
  container: '.m-module',
};

let settings,
    containers;

const bindEvents = () => {
  // ...
},
unbindEvents = () => {
  // ...
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object} Instance of created module.
 */
instance.init = (options) => {
  settings = Object.assign({}, defaults, options);

  containers = [...document.querySelectorAll(`${settings.container}`)];

  bindEvents();

  return instance;
};

/**
 * Destroy this module.
 *
 * @return {undefined}
 */
instance.destroy = () => {
  unbindEvents();
};

export default instance;
