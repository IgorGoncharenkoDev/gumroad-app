import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { appRouter } from '@/api/routes'
import { webhooksRouter } from '@/api/webhooks'
import { env } from '@/config/env'
import { errorMiddleware } from '@/middlewares/error.middleware'
import { notFoundMiddleware } from '@/middlewares/not-found.middleware'

const app = express()

// Global middlewares
app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
}))
app.use(helmet())
app.use(cookieParser())

// Webhooks
app.use(
  '/webhooks',
  express.raw({
    type: 'application/json',
  }),
  webhooksRouter,
)

// Routes
app.use('/api', express.json(), appRouter)

// 404 handler
app.use(notFoundMiddleware)

// Error handler
app.use(errorMiddleware)

export default app
