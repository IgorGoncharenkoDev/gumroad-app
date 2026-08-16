import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'

import { appRouter } from '@/api/routes'
import { env } from '@/config/env'
import { errorMiddleware } from '@/middlewares/error.middleware'

const app = express()

// Global middlewares
app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
}))
app.use(helmet())
app.use(cookieParser())

// Routes
app.use('/api', express.json(), appRouter)

// Error handler
app.use(errorMiddleware)

export default app
