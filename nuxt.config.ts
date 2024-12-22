// https://nuxt.com/docs/api/configuration/nuxt-config
const env = process.env;
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: env.NODE_ENV === 'development' },
  nitro: {
    devProxy: {
      '/api': {
        target: 'http://vancan.dev:8000/',
        changeOrigin: true,
      },
    },
  },
  runtimeConfig: {
    public: {
      appUrl: env.NUXT_PUBLIC_APP_URL,
      apiUrl: env.NUXT_PUBLIC_API_URL,
      authUrl: env.NUXT_PUBLIC_AUTH_URL,
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@vueuse/nuxt',
    '@nuxt/icon',
    '@nuxt/fonts',
    '@nuxt/eslint',
    '@sidebase/nuxt-auth',
    '@vee-validate/nuxt',
    '@morev/vue-transitions/nuxt',
    '@nuxtjs/i18n',
  ],
  icon: {
    serverBundle: {
      collections: ['circle-flags'],
    },
  },
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', iso: 'es-PE', name: 'Español', file: 'es.json' },
    ],
    defaultLocale: 'es',
    strategy: 'no_prefix',
    langDir: 'locales/',
    lazy: false,
    vueI18n: './i18n/i18n.config.ts',
    experimental: {
      typedOptionsAndMessages: 'all',
    },
  },
  auth: {
    globalAppMiddleware: true,
    baseURL: env.NUXT_PUBLIC_AUTH_URL,
    // baseURL: process.env.NUXT_PUBLIC_API_URL,
    // disableInternalRouting: true,x|
    provider: {
      session: {
        dataType: {
          id: 'number',
          username: 'string',
        },
      },
      type: 'local',
      endpoints: {
        signIn: {
          path: 'login-api/',
          method: 'post',
        },
        getSession: {
          path: 'api/user/',
          method: 'get',
        },
        signOut: {
          path: 'logout-api/',
          method: 'get',
        },
      },
      token: {
        // maxAgeInSeconds: 60 * 60 * 24 * 30,
        // secureCookieAttribute: true,
        // httpOnlyCookieAttribute: true,
        type: 'token',
      },

      pages: {
        login: '/auth/login',
      },
    },
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
    disableHMR: true,
  },

  colorMode: {
    classSuffix: '',
  },

  imports: {
    imports: [
      {
        from: 'tailwind-variants',
        name: 'tv',
      },
      {
        from: 'tailwind-variants',
        name: 'VariantProps',
        type: true,
      },
      {
        from: 'vue-sonner',
        name: 'toast',
        as: 'useSonner',
      },
    ],
  },

  build: {
    transpile: ['vue-sonner'],
  },
});
