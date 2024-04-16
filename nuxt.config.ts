// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  nitro: {
    experimental: {
      websocket: true
    }
  },
  routeRules: {
    // Homepage pre-rendered at build time
    // '/scanner': { prerender: true },
  },
  devtools: { enabled: true }
})