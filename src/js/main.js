import '@js/helpers/polyfills';

// Bundle Config
import '@root/.modernizrrc';
import '@js/libs/modernizr-custom-tests';
import '@css/main.scss';

// Page Defaults
import '@js/main.config';

import createApp from '@js/libs/create-app';
import button from '@js/demo/button';

// TODO: Define namespace where modules are registered
window.apps = {};
window.apps.main = createApp({
  modules: {
    // Directly integrate module
    button,

    // lazy-load module if it's found in the DOM
    'vue-module': () => import(/* webpackChunkName: "vue-mod" */ './demo/vue-module'),

    // lazy laod when scrolled to this element
    'lazy-module': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-mod" */ './demo/lazy-module'),
    },
  },
});

import '@html/modules/m00-accordion/main.js';
import '@html/modules/m01-toggle/main.ts';

