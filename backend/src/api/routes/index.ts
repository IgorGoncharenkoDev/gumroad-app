import { Router } from 'express'

import { authRouter } from '@/api/routes/auth.route'
import { creatorRouter } from '@/api/routes/creator/creator.route'
import { healthRouter } from '@/api/routes/health.route'
import { userRouter } from '@/api/routes/user.route'

export const appRouter = Router()

appRouter.use('/health', healthRouter)

appRouter.use('/auth', authRouter)
appRouter.use('/creator', creatorRouter)
appRouter.use('/', userRouter)
