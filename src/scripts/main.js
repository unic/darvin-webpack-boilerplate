/* global __webpack_hash__ */

/**
 * Entrypoint
 *
 * webpack entry point
 *
 * @file   entrypoint for modern browser
 * @author Unic AG
 */

// Bundle Config
import '@root/webpack/settings/javascript-modernizr/config/.modernizrrc';
import '@scripts/libs/modernizr-custom-tests';
import '@css/main.scss';

// Page Defaults
import '@scripts/main.config';
import '@scripts/helpers/flying-focus';

import { CreateApp } from '@scripts/libs/create-app';

import image from '../templates/components/c02-image';

import devTools from '@scripts/helpers/dev-tools';

// store hash
if (process.env.NODE_ENV === 'prod') {
  process.env.WEBPACK_MODERN = __webpack_hash__;
}

window.apps = {};
window.apps.main = new CreateApp({
  modules: {
    // Directly integrate module
    image
  }
});

// start devtools
if (process.env.NODE_ENV === 'dev') {
  new devTools;
}
