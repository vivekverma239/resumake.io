import Router from 'koa-router'

const router = new Router({ prefix: '/api' })

router.get('/cats', async ctx => {
  ctx.body = { cats: true }
})

export default router
