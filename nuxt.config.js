import {deepMerge} from 'avril/js/utils/object.js';
import sharedConfig from 'avril/js/nuxt.config.js';

export default deepMerge(sharedConfig, {
  css: [
    { src: '~/assets/scss/app.scss', lang: 'scss' }
  ],
  head: {
    title: 'Mon espace Avril - la VAE facile',
    htmlAttrs: {
      class: 'has-aside-left has-aside-mobile-transition has-navbar-fixed-top'
    },
  },
  loading: { color: 'rgb(221, 209, 209)' },
  markdownit: {
    injected: true,
    linkify: true,
  },
  plugins: [
    '~/plugins/buefy.js',
  ],
  router: {
    base: process.env.NUXT_PROFILE_PATH,
  },
  sentry: {
    dsn: process.env.NUXT_PROFILE_SENTRY_DSN,
  }
})
