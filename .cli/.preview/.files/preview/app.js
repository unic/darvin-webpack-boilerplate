import '@js/helpers/polyfills';

import '@root/.modernizrrc';
import '@js/libs/modernizr-custom-tests';
import '@css/main.scss';

import createApp from '@js/libs/create-app';

// TODO: Define namespace where modules are registered
let mod = {
  modules: {
    'lazy-prev-icons': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-prev-icons" */ '@js/icon-copy.preview'),
    },
    'lazy-prev-colors': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-prev-colors" */ '@js/color-copy.preview'),
    },
  },
};

// add preview bar only on non ie
if(!Modernizr.ie) {
  mod.modules['lazy-prev-bar'] = {
    lazy: false,
    handler: () => import(/* webpackChunkName: "lazy-prev-bar" */ '@js/header-bar.preview'),
  };
}

window.apps = {};
window.apps.main = createApp(mod);

import vue from '@js/vue-root';

vue.init();
