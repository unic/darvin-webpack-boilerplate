/* global __webpack_hash__ */

/**
 * Entrypoint
 *
 * webpack entry point
 *
 * @file   entrypoint for modern browser
 * @author Unic AG
 */

 /*

 HOWTO: INCLUDE SCRIPTS IN HTML
===============================

  <!-- main bundle -->
  <script type="module" src="/assets/scripts/main.c03ae30586c259403fcb.js"></script>

  # remove hash
  *************
  remove [fullhash] from settings.output.filename in all webpack configs:

  - webpack\webpack.config.dev.js
  - webpack\webpack.config.prod.modern.js

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

// store hash
if (process.env.NODE_ENV === 'prod') {
  process.env.WEBPACK_MODERN = __webpack_hash__;
}

window.apps = {};
window.apps.main = new CreateApp({
  modules: {
    // modules here (https://www.darvin.dev/#develop)
  }
});

// start devtools
if (process.env.NODE_ENV === 'dev') {
  new devTools;
}
