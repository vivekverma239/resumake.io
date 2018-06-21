import Koa from 'koa'
import router from './api'

const app = new Koa()

app.use(router.routes())
app.use(router.allowedMethods())

export default app
