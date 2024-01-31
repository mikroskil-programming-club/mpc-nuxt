// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  nitro:{
    plugins: ['~/server/index.ts']
  },
  runtimeConfig:{
    mongodbURI: process.env.MONGODB_URI,
    tokenKey: process.env.SECRET_TOKEN_KEY
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ['@pinia/nuxt'],
  pinia:{
    storesDirs:['./stores/**']
  }
})
