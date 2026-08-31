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
  // 缓存全部交给平台（ESA 边缘节点）处理，Nuxt 自身不做任何缓存。
  // 这里只发 CDN-Cache-Control，由边缘节点决定是否缓存、缓存多久。
  //
  // s-maxage=30：边缘节点缓存 30 秒，命中期间直接返回，不回源
  // stale-while-revalidate=86400：过期后 24h 内先返回旧内容（用户零等待），
  //                                同时后台异步回源刷新
  routeRules: {
    '/': {
      headers: {
        'CDN-Cache-Control': 'public, s-maxage=30, stale-while-revalidate=86400'
      }
    },
    '/api/ssr-data': {
      headers: {
        'CDN-Cache-Control': 'public, s-maxage=30, stale-while-revalidate=86400'
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
