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
    // 首页 - 纯 SSR
    // 缓存交给 ESA/CDN 层：Cache-Control 告知边缘节点缓存 60s，避免 Nitro SWR 的 waitUntil 问题
    '/': {
      ssr: true,
      headers: {
        'Cache-Control': 'public, max-age=60, s-maxage=60, stale-while-revalidate=300'
      }
    }
  },
  sourcemap: false,
  compatibilityDate: '2025-07-15',

  // V8 Edge 部署（阿里云 ESA / Cloudflare 等边缘平台）
  // 产物为 .output/server/index.mjs，导出 export default { fetch }
  nitro: {
    preset: 'cloudflare-module'
  },

  // TypeScript Configuration
  typescript: {
    strict: true
    // typeCheck: true // Temporarily disabled to avoid additional dependencies
  }
})
