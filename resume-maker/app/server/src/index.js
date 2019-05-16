/**
 * @flow
 */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'
import router from './routes'
import { errorHandler } from './middleware'

const app = new Koa()
const cors = require('@koa/cors');

if (app.env === 'development') {
  app.proxy = true
}
app.use(cors())
app.use(errorHandler())
app.use(helmet())
app.use(bodyParser())
app.use(router)

export default app
