import '@css/main.scss';

import createApp from '@js/libs/create-app';

// TODO: Define namespace where modules are registered
window.apps = {};
window.apps.main = createApp({
  modules: {
    // lazy laod when scrolled to this element
    'lazy-prev-bar': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-prev-bar" */ '@js/header-bar.preview'),
    },
    'lazy-prev-icons': {
      lazy: true,
      handler: () => import(/* webpackChunkName: "lazy-prev-icons" */ '@js/icon-copy.preview'),
    },
  },
});

import vue from '@js/vue-root';

vue.init();
