// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      appUrl: 'http://localhost:3000',
      apiUrl: 'https://vacunacan.dirislimasur.gob.pe',
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
  ],
  auth: {
    baseURL: process.env.NUXT_PUBLIC_API_URL,
    provider: {
      type: 'local',
    },
  },

  tailwindcss: {
    exposeConfig: true,
    editorSupport: true,
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
