import './helpers/polyfills';

// Bundle Config
import '../../.modernizrrc';
import './libs/modernizr-custom-tests';
import '../styles/main.scss';

// Page Defaults
import './main.config';

import createApp from './libs/create-app';
import button from './demo/button';

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

import '../templates/modules/m01-accordion/main.js';

