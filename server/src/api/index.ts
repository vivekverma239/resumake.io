import Router from 'koa-router'

const router = new Router({ prefix: '/api' })

const foo = 10

router.get('/cats', async ctx => {
  ctx.body = { cats: true }
})

export default router
