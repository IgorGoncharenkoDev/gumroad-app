import { Router } from 'express'

import { authRouter } from '@/api/routes/auth.route'
import { healthRouter } from '@/api/routes/health.route'
import { productRouter } from '@/api/routes/product.route'
import { userRouter } from '@/api/routes/user.route'

export const appRouter = Router()

appRouter.use('/health', healthRouter)

appRouter.use('/auth', authRouter)
appRouter.use('/products', productRouter)
appRouter.use('/', userRouter)
