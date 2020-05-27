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
import devTools from '@scripts/helpers/dev-tools';

/*
  BOILERPLATE
**/

// store hash
if (process.env.NODE_ENV === 'prod') {
  process.env.WEBPACK_MODERN = __webpack_hash__;
}

// start devtools
if (process.env.NODE_ENV === 'dev') {
  new devTools;
}

/*
  MODULES
**/
import image from '../templates/components/c02-image/index';
import background from '../templates/modules/m03-background/index';
import manual from '../templates/modules/m04-manual/index';

window.apps = {};
window.apps.main = new CreateApp({
  modules: {
    // Directly integrate module
    image,
    manual
  }
});

background.init();
