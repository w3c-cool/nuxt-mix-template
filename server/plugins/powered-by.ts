// 将 Nuxt 默认的 X-Powered-By 响应头值改为 W3C
// V8 边缘兼容版：不依赖 Node 的 ctx.event.node.res，仅操作响应头对象
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:response', (response) => {
    if (!response.headers) response.headers = {}
    response.headers['x-powered-by'] = 'W3C'
  })
})
