// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // CSS Configuration
  css: ['~/assets/css/main.css'],

  // Runtime Configuration
  // 注意：构建期执行，buildTime 在构建时固定（V8 边缘运行时无 process）
  runtimeConfig: {
    public: {
      buildTime: new Date().toISOString()
    }
  },

  // Route Rules Configuration
  routeRules: {
    // 首页 - SWR 缓存 60 秒
    '/': { swr: 60 }
  },
  sourcemap: false,
  compatibilityDate: '2025-07-15',

  // V8 Edge 部署（阿里云 ESA / Cloudflare 等边缘平台）
  // 产物为 .output/server/index.mjs，导出 export default { fetch }
  nitro: {
    preset: 'cloudflare-module',
    // 构建时预压缩公共静态资源（js/css），减小传输体积
    compressPublicAssets: {
      gzip: true,
      brotli: true
    }
  },

  // TypeScript Configuration
  typescript: {
    strict: true
    // typeCheck: true // Temporarily disabled to avoid additional dependencies
  }
})
