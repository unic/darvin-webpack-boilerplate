/* global __webpack_hash__ */

/**
 * Entrypoint
 *
 * IE11 legacy script
 *
 * @file   polyfilled entrypoint for legacy browser
 * @author Unic AG
 */

 /*

 HOWTO: INCLUDE SCRIPTS IN HTML
===============================

  <!-- main bundle -->
  <script type="module" src="/assets/scripts/main.c03ae30586c259403fcb.js"></script>
  <!-- polyfilled legacy browser -->
  <script nomodule src="/assets/scripts/main.legacy.9bb922f8841fae8e52e4.js" defer></script>

  # remove hash
  *************
  remove [hash] from settings.output.filename in all webpack configs:

  - webpack\webpack.config.dev.js
  - webpack\webpack.config.prod.modern.js
  - webpack\webpack.config.prod.legacy.js

*/

import '@scripts/helpers/polyfills';

// Polyfills
import svg4everybody from 'svg4everybody';

// Bundle Config
import '@root/webpack/settings/javascript-modernizr/config/.modernizrrc';
import '@scripts/libs/modernizr-custom-tests';
import '@css/main.scss';

// Page Defaults
import '@scripts/main.config';
import '@scripts/helpers/flying-focus';

import { CreateApp } from '@scripts/libs/create-app';

import devTools from '@scripts/helpers/dev-tools';

// Init svg4everybody before module initiation
svg4everybody();

// load postcss transpiled IE Stylesheet if available
if (process.env.NODE_ENV === 'prod') {
  process.env.WEBPACK_LEGACY = __webpack_hash__;
  const fileHash = __webpack_hash__;
  let ieStylesheet = document.createElement('link');
  ieStylesheet.rel = 'stylesheet';
  ieStylesheet.href = `/assets/css/style-legacy.${fileHash}.css`; // This link will be replaced by backend to include hash
  document.head.insertBefore(ieStylesheet, document.head.childNodes[document.head.childNodes.length]);

  // The next link will be replaced by backend to include the modern stylesheet link
  const modernStylesheet = document.head.querySelector(`[href*="style.${fileHash}.css"]`);
  if (modernStylesheet) {
    modernStylesheet.parentNode.removeChild(modernStylesheet);
  }
}

window.apps = {};
window.apps.main = new CreateApp({
  modules: {
    // modules here (https://www.darvin.dev/#develop)
  },
});

// start devtools
if (process.env.NODE_ENV === 'dev') {
  new devTools;
}
