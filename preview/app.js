import '@scripts/helpers/polyfills';

import '@root/webpack/settings/javascript-modernizr/config/.modernizrrc';
import '@scripts/libs/modernizr-custom-tests';
import '@css/main.scss';

import createApp from '@scripts/libs/create-app';

// TODO: Define namespace where modules are registered
let mod = {
  modules: {
    'lazy-prev-icons': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-prev-icons" */ '@scripts/icon-copy.preview'),
    },
    'lazy-prev-colors': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-prev-colors" */ '@scripts/color-copy.preview'),
    },
  },
};

// add preview bar only on non ie
if(!Modernizr.ie) {
  mod.modules['lazy-prev-bar'] = {
    lazy: false,
    handler: () => import(/* webpackChunkName: "lazy-prev-bar" */ '@scripts/header-bar.preview'),
  };
}

window.apps = {};
window.apps.main = createApp(mod);