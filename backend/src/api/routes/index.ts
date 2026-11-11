import { Router } from 'express'

import { authRouter } from '@/api/routes/auth.route'
import { creatorRouter } from '@/api/routes/creator/creator.route'
import { healthRouter } from '@/api/routes/health.route'
import { paymentsRouter } from '@/api/routes/payments.route'
import { publicProductRouter } from '@/api/routes/public-product.route'
import { userRouter } from '@/api/routes/user.route'

export const appRouter = Router()

appRouter.use('/health', healthRouter)

appRouter.use('/auth', authRouter)
appRouter.use('/creator', creatorRouter)
appRouter.use('/payments', paymentsRouter)
appRouter.use('/products', publicProductRouter)
appRouter.use('/', userRouter)
