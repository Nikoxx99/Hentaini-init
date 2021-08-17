const colors = require('vuetify/es5/util/colors').default
require('dotenv').config()
module.exports = {
  mode: 'universal',
  telemetry: false,
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: 'https://cdn.hentaini.com/favicon.ico' }
    ],
    script: [
      {
        src: 'https://hentaini.com/script.js'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/disqus'
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/dotenv',
    '@nuxtjs/vuetify',
    '@nuxtjs/apollo',
    '@nuxtjs/moment',
    ['@nuxtjs/google-analytics', {
      id: 'UA-170511662-1'
    }]
  ],
  moment: {
    timezone: true,
    locales: ['es']
  },

  apollo: {
    clientConfigs: {
      default: {
        httpEndpoint: process.env.API_ENDPOINT
      }
    }
  },
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'nuxt-i18n',
    '@nuxtjs/onesignal',
    '@nuxtjs/pwa'
  ],

  i18n: {
    lazy: true,
    locales: [
      {
        code: 'en',
        name: 'English',
        iso: 'en-US',
        file: 'en.js'
      },
      {
        code: 'es',
        name: 'Español',
        iso: 'es-ES',
        file: 'es.js'
      }
    ],
    defaultLocale: 'en',
    strategy: 'prefix_and_default',
    langDir: 'lang/',
    detectBrowserLanguage: {
      useCookie: true,
      cookieDomain: null,
      cookieKey: 'i18n_redirected',
      alwaysRedirect: true,
      fallbackLocale: 'en'
    }
  },
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },

  oneSignal: {
    init: {
      appId: process.env.ONESIGNAL_API_ID,
      allowLocalhostAsSecureOrigin: true,
      welcomeNotification: {
        disable: true
      },
      notifyButton: {
        enable: true,
        offset: {
          bottom: 20
        }
      },
      promptOptions: {
        slidedown: {
          enabled: true,
          autoPrompt: true,
          timeDelay: 2,
          pageViews: 1,
          actionMessage: "We'd like to show you notifications for new Episodes and Series",
          acceptButtonText: 'OK',
          cancelButtonText: "IT'S MA'AM"
        }
      }
    }
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
