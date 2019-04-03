/**
 * @file Darvin Copy Icon
 * @author Tobias Frei
 *
 * @module icon
 */

const instance = {};
const defaults = {
  container: '.m-prev-icons',
  icon: '.m-prev-flexgrid__iconbox'
};

const settings = {};

// Module Variables
let container,
    icons;

// Private Functions
const copyIcon = (e) => {
  var copyText = e.currentTarget.querySelector('input');
  copyText.select();
  document.execCommand("copy");
};

/**
 * Initialize module
 *
 * @param {object} options - Override default settings with options object.
 * @return {object|undefined} Instance of created module.
 */

instance.init = (options) => {
  Object.assign(settings, defaults, options);

  // Public Code
  container = document.querySelector(settings.container);
  if(!container) return;

  icons = document.querySelectorAll(settings.icon);

  [...icons].forEach((icon) => {
    icon.addEventListener('click', copyIcon);
  });

  return instance;
};

export default instance;
