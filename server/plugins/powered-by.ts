// 设置 SSR 响应头（V8 边缘兼容版）
// 不依赖 Node 的 ctx.event.node.res，直接操作响应头对象，确保头一定生效。
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response.headers) response.headers = {}
    // 品牌标识
    response.headers['x-powered-by'] = 'W3C'
    // 缓存交给 ESA/CDN 层：s-maxage=60 缓存 60 秒，
    // stale-while-revalidate 过期后先返回旧缓存并后台刷新。
    // SWR 由 CDN 实现，不经 Nitro 缓存层，避免 Nitro 的 waitUntil 问题。
    response.headers['cache-control'] = 's-maxage=60, stale-while-revalidate'
  })
})
