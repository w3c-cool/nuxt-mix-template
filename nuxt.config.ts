// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  sourcemap: false,

  // CSS Configuration
  css: ['~/assets/css/main.css'],

  // Route Rules Configuration
  routeRules: {
    // 首页 - Server-Side Rendering
    '/': { ssr: true }
  },

  // TypeScript Configuration
  typescript: {
    strict: true
    // typeCheck: true // Temporarily disabled to avoid additional dependencies
  },

  // Runtime Configuration
  // 注意：构建期执行，buildTime 在构建时固定（V8 边缘运行时无 process）
  runtimeConfig: {
    public: {
      buildTime: new Date().toISOString()
    }
  },

  // V8 Edge 部署（阿里云 ESA / Cloudflare 等边缘平台）
  // 产物为 .output/server/index.mjs，导出 export default { fetch }
  nitro: {
    preset: 'cloudflare-module'
  }
})
