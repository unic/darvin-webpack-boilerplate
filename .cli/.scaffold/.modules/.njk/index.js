/**
<<<<<<< HEAD
 * @author {{authorEmail}}
 *
 * @module {{name}}
=======
 * @author @@@authorEmail@@@
 *
 * @module @@@name@@@
>>>>>>> bugfix/issue#3-darvin-cli_change_token
 *
 */

const instance = {};

const defaults = {
  container: '.m-module',
};

<<<<<<< HEAD
=======
let settings,
    containers;

>>>>>>> bugfix/issue#3-darvin-cli_change_token
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
