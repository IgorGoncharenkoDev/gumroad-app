import express from 'express'

import { healthRouter } from '@/api/routes/health.route'

export const appRouter = express.Router()

appRouter.use('/health', healthRouter)