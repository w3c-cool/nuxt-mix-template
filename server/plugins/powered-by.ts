// 设置 SSR 响应头（V8 边缘兼容版）
// 不依赖 Node 的 ctx.event.node.res，仅操作响应头对象。
// 注意：server 头通常由 ESA CDN 在最外层注入，应用层设置可能被平台覆盖。
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response.headers) response.headers = {}
    response.headers['x-powered-by'] = 'W3C'
    response.headers['server'] = 'W3C'
  })
})
